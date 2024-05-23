<template>
  <div class="flex flex-col w-full gap-[4rem]">
    <div class="flex justify-between w-full">
      <div class="flex flex-col gap-[4rem] items-center">
        <div
          v-if="products.length !== 0 || loading"
          class="w-[58.5rem] h-[24rem] border border-gray rounded-2xl px-8 flex flex-col items-center justify-start gap-8 pt-8"
        >
          <div
            v-for="(product, idx) in products"
            :key="product.code"
            class="flex items-center justify-between w-full px-4 h-14"
          >
            <div class="text-xl font-normal">
              {{ idx + 1 }}. ({{ product.type }}){{ product.bankName }} -
              <span class="text-airbnb">{{ product.name }}</span>
            </div>
            <div class="flex space-x-4">
              <button @click.prevent="clickDetail(product)" class="px-6 text-white h-7 bg-airbnb rounded-[30px]">
                상세보기
              </button>
              <button
                @click.prevent="deleteProductUser(product)"
                class="px-6 border h-7 rounded-[30px] text-gray border-gray"
              >
                가입취소
              </button>
            </div>
          </div>
        </div>
        <div
          v-if="!loading && !products.length"
          class="w-[58.5rem] h-[24rem] border border-gray rounded-2xl px-8 flex flex-col items-center justify-center gap-8"
        >
          <p>
            가입한 상품이 없습니다.<br />
            마음에 드는 <span class="text-airbnb">야무진</span> 상품을 찾아보세요! 🛫
          </p>
        </div>
        <v-dialog v-model="dialog" width="800">
          <v-card v-if="selectedProduct" class="px-3 py-5">
            <v-card-title class="d-flex align-center justify-space-between">
              <h3>{{ selectedProduct['금융 상품명'] }}</h3>
              <div v-if="userStore.isAuthenticated">
                <v-btn
                  v-if="isContractProduct"
                  color="red"
                  variant="flat"
                  @click.prevent="deleteProductUser(selectedProductSimple)"
                  >가입 취소하기</v-btn
                >
              </div>
            </v-card-title>

            <v-card-text>
              <v-table>
                <tbody>
                  <tr v-for="(value, key) in selectedProduct" :key="key">
                    <td width="25%" class="font-weight-bold">{{ key }}</td>
                    <td v-if="key.toString() === '최고 한도'">
                      {{ value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
                    </td>
                    <td v-else>{{ value }}</td>
                  </tr>
                </tbody>
              </v-table>
              <v-divider class="my-3"></v-divider>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#FD5C63" variant="text" @click="close"> 닫기 </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <profileIcon name="travel" />
    </div>
    <div class="flex flex-col items-start w-full gap-[4rem]">
      <h1 class="text-[2.25rem] font-medium border-b-[3px] border-[#222222] ml-[2rem]">가입한 상품 금리</h1>
      <div class="w-full flex flex-col gap-[1rem]">
        <v-row class="flex flex-col w-1/4">
          <v-col>
            <v-select
              variant="outlined"
              color="#FD5C63"
              label="개월 선택"
              :items="months"
              item-text="title"
              item-value="value"
              v-model="selectedMonth"
              class="my-3"
            ></v-select>
          </v-col>
        </v-row>
        <div v-if="chartReady" class="flex items-center justify-center w-full">
          <BarChart :selected-month="selectedMonth" :labels="labels" :intr-rate="intrRate" :intr-rate2="intrRate2" />
        </div>
        <div v-if="loading" class="loading">
          <v-progress-circular color="#FD5C63" indeterminate size="80"></v-progress-circular>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, Ref } from 'vue';
import { useUserStore } from '@/store/modules/users';
import BarChart from '@/components/common/BarChart.vue';
import { instance, getAuthInstance } from '@/api/axios';

const userStore = useUserStore();

const authInstance = getAuthInstance();

type Option = {
  intrRate: number;
  intrRate2: number;
  intrRateTypeNm: string;
  saveTrm: string;
};

const products = ref<{ code: string; name: string; type: string; bankName: string; options: Option[] }[]>([]);
const dialog = ref(false);
const loading = ref(true);
const chartReady = ref(false);
const isDeposit = ref(false);
const intrRate2: Ref<number[]> = ref([]);

const selectedProduct = ref();
const selectedProductSimple = ref();
const selectedProductCode = computed(() => {
  return selectedProductSimple.value?.code;
});
const isContractProduct = computed(() => {
  if (selectedProductSimple.value?.type === '정기예금') {
    return userStore.userInfo?.contract_deposit.some((e: any) => e['deposit_code'] === selectedProductCode.value);
  } else if (selectedProductSimple.value?.type === '정기적금') {
    return userStore.userInfo?.contract_saving.some((e: any) => e['saving_code'] === selectedProductCode.value);
  }
});

const intrRateDeposit: Ref<number[]> = ref([]);
const intrRate2Deposit: Ref<number[]> = ref([]);

const intrRateF: Ref<number[]> = ref([]);
const intrRate2F: Ref<number[]> = ref([]);
const intrRateS: Ref<number[]> = ref([]);
const intrRate2S: Ref<number[]> = ref([]);

const months = [
  { title: '6개월 금리', value: 6 },
  { title: '12개월 금리', value: 12 },
  { title: '24개월 금리', value: 24 },
];

const selectedMonth = ref(months[0]);
const averageIntrRate = computed(() => {
  if (selectedMonth.value.value === 6) {
    return 3.45;
  } else if (selectedMonth.value.value === 12) {
    return 4.08;
  } else if (selectedMonth.value.value === 24) {
    return 3.4;
  } else if (selectedMonth.value.value === 36) {
    return 3.35;
  } else {
    return 3.45;
  }
});

const labels = ref(['평균 금리']);
const filterLabels = function () {
  for (const product of products.value) {
    labels.value.push((product as unknown as { name: string }).name);
  }
};
watch(products, () => {
  chartReady.value = false;
  loading.value = true;
  labels.value = ['평균 금리'];
  intrRate.value = [averageIntrRate.value];
  intrRate2.value = [];
  setTimeout(() => {
    Promise.all([changeMonth(), filterLabels()]).then(() => {
      loading.value = false;
      chartReady.value = true;
    });
  }, 500);
});

const intrRate = ref([averageIntrRate.value]);

const changeMonth = function () {
  const tempMonth = selectedMonth.value.value || selectedMonth.value;

  const filteredProducts = products.value.flatMap((product) =>
    product.options.filter((option) => option.saveTrm === String(tempMonth)),
  );

  intrRate.value = filteredProducts.map((product) => product?.intrRate);
  intrRate2.value = filteredProducts.map((product) => product?.intrRate2);
};

watch(selectedMonth, () => {
  chartReady.value = false;
  loading.value = true;
  labels.value = ['평균 금리'];

  intrRate.value = [averageIntrRate.value];
  intrRate2.value = [];
  setTimeout(() => {
    Promise.all([changeMonth(), filterLabels()]).then(() => {
      loading.value = false;
      chartReady.value = true;
    });
  }, 500);
});

const getProducts = function () {
  const deposits = userStore.userContractDeposits;
  const savings = userStore.userContractSavings;
  let id = 1;

  const createProduct = (
    product: { [x: string]: any; kor_co_nm: any; name: any },
    type: string,
    code: string,
    options: any[],
  ) => ({
    id: id++,
    code: product[code],
    type,
    bankName: product.kor_co_nm,
    name: product.name,
    options: options.map((option) => ({
      intrRate: option.intr_rate,
      intrRate2: option.intr_rate2,
      intrRateTypeNm: option.intr_rate_type_nm,
      saveTrm: option.save_trm,
      rsrvTypeNm: option.rsrv_type_nm,
    })),
  });

  products.value = [
    ...deposits.map((deposit: any) => createProduct(deposit, '정기예금', 'deposit_code', deposit.depositoption_set)),
    ...savings.map((saving: any) => createProduct(saving, '정기적금', 'saving_code', saving.savingoption_set)),
  ];
};

onMounted(async () => {
  await getProducts();
  changeMonth();
  filterLabels();
  loading.value = false;
  chartReady.value = true;
});

const close = function () {
  dialog.value = false;
};

const clickDetail = function (data: any) {
  selectedProductSimple.value = data;
  isDeposit.value = data.type === '정기예금' ? true : false;
  intrRateDeposit.value = [];
  intrRate2Deposit.value = [];
  intrRateF.value = [];
  intrRate2F.value = [];
  intrRateS.value = [];
  intrRate2S.value = [];
  getProduct();
  dialog.value = true;
};

const getProduct = function () {
  let url = '';
  if (isDeposit.value) {
    url = `/financial/deposit_list/${selectedProductCode.value}/`;
  } else {
    url = `/financial/saving_list/${selectedProductCode.value}/`;
  }

  instance
    .get(url)
    .then((res) => {
      const data = res.data;
      selectedProduct.value = {
        '공시 제출월': data['dcls_month'],
        '금융 회사명': data['kor_co_nm'],
        '금융 상품명': data['name'],
        '가입 방법': data['join_way'],
        '만기 후 이자율': data['mtrt_int'],
        '우대 조건': data['spcl_cnd'],
        '가입 대상': data['join_member'],
        '가입 제한': data['join_deny'] === 1 ? '제한없음' : data['join_deny'] === 2 ? '서민전용' : '일부제한',
        '최고 한도': data['max_limit'],
        '기타 유의사항': data['etc_note'],
      };

      if (isDeposit.value) {
        const optionList = res.data.depositoption_set;

        for (const option of optionList) {
          if (option.save_trm === '6') {
            intrRateDeposit.value[0] = option.intr_rate;
            intrRate2Deposit.value[0] = option.intr_rate2;
          } else if (option.save_trm === '12') {
            intrRateDeposit.value[1] = option.intr_rate;
            intrRate2Deposit.value[1] = option.intr_rate2;
          } else if (option.save_trm === '24') {
            intrRateDeposit.value[2] = option.intr_rate;
            intrRate2Deposit.value[2] = option.intr_rate2;
          }
        }
      } else {
        const optionList = res.data.savingoption_set;

        for (const option of optionList) {
          if (option.rsrv_type_nm === '자유적립식') {
            if (option.save_trm === '6') {
              intrRateF.value[0] = option.intr_rate;
              intrRate2F.value[0] = option.intr_rate2;
            } else if (option.save_trm === '12') {
              intrRateF.value[1] = option.intr_rate;
              intrRate2F.value[1] = option.intr_rate2;
            } else if (option.save_trm === '24') {
              intrRateF.value[2] = option.intr_rate;
              intrRate2F.value[2] = option.intr_rate2;
            }
          } else {
            if (option.save_trm === '6') {
              intrRateS.value[0] = option.intr_rate;
              intrRate2S.value[0] = option.intr_rate2;
            } else if (option.save_trm === '12') {
              intrRateS.value[1] = option.intr_rate;
              intrRate2S.value[1] = option.intr_rate2;
            } else if (option.save_trm === '24') {
              intrRateS.value[2] = option.intr_rate;
              intrRate2S.value[2] = option.intr_rate2;
            }
          }
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteProductUser = function (data: any) {
  const anwser = window.confirm('정말 가입을 취소하시겠습니까?');
  isDeposit.value = data.type === '정기예금' ? true : false;

  if (anwser) {
    selectedProductSimple.value = data;
    let url = '';
    if (isDeposit.value) {
      url = `/financial/deposit_list/${selectedProductCode.value}/contract/`;
    } else {
      url = `/financial/saving_list/${selectedProductCode.value}/contract/`;
    }

    authInstance
      .delete(url)
      .then(() => {
        loading.value = true;
        userStore.getUserInfo(userStore.userInfo.username);
        products.value = [];
        dialog.value = false;
        setTimeout(() => {
          getProducts();
          loading.value = false;
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
</script>

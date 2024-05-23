<template>
  <div class="flex flex-col items-center w-full gap-[2rem] pb-[4rem]">
    <h1 class="text-[2.25rem] font-medium w-3/4"><span class="text-airbnb">정기예금</span> 비교하기</h1>
    <div class="flex justify-end w-3/4">
      <div class="w-1/4">
        <v-select
          variant="outlined"
          color="#FD5C63"
          label="은행"
          :items="banks"
          v-model="selectedBank"
          @update:modelValue="clickBank"
          class="ml-auto"
        ></v-select>
      </div>
    </div>

    <v-dialog v-model="dialog" class="w-3/4">
      <v-card v-if="selectedDeposit" class="px-3 py-5">
        <v-card-title class="d-flex align-center justify-space-between">
          <h3>{{ selectedDeposit['금융 상품명'] }}</h3>
          <div v-if="userStore.isAuthenticated">
            <v-btn v-if="isContractDeposit" color="red" variant="flat" @click.prevent="deleteDepositUser"
              >가입 취소하기</v-btn
            >
            <v-btn v-else color="#FD5C63" variant="flat" @click.prevent="addDepositUser">가입하기</v-btn>
          </div>
        </v-card-title>

        <v-card-text>
          <v-table>
            <tbody>
              <tr v-for="(value, key) in selectedDeposit" :key="key">
                <td width="28%" class="font-weight-bold">{{ key }}</td>
                <td v-if="String(key) === '최고 한도'">
                  {{ typeof value === 'number' ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : value }}
                </td>
                <td v-else>{{ value }}</td>
              </tr>
            </tbody>
          </v-table>
          <v-divider class="my-3"></v-divider>
          <div class="mx-auto"></div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#FD5C63" variant="text" @click="close"> 닫기 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-table-virtual
      v-if="depositLength !== 0"
      fixed-header
      :headers="headers"
      :items-length="depositLength"
      :items="deposits"
      item-value="deposit_code"
      height="600"
      class="table w-3/4 elevation-6"
    >
      <template v-slot:item="{ item }">
        <tr @click="clickRow(item)" class="cursor-pointer hover:bg-slate-200">
          <td>{{ item['dcls_month'] }}</td>
          <td>{{ item['kor_co_nm'] }}</td>
          <td align="center">{{ item['name'] }}</td>
          <td align="center">{{ item['6month'] }}</td>
          <td align="center">{{ item['12month'] }}</td>
          <td align="center">{{ item['24month'] }}</td>
        </tr>
      </template>
    </v-data-table-virtual>

    <div v-else class="h-[15rem] w-full flex justify-center items-center">
      <v-progress-circular color="#FD5C63" indeterminate size="80"></v-progress-circular>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/modules/users';
import { instance, getAuthInstance } from '@/api/axios';

const authInstance = getAuthInstance();

const headers = ref([
  { title: '공시 제출일', value: 'dcls_month', align: 'center', sortable: false, width: '10%', key: 'dcls_month' },
  { title: '금융회사명', value: 'kor_co_nm', align: 'center', sortable: false, key: 'kor_co_nm' },
  { title: '상품명', value: 'name', align: 'center', sortable: false, width: '32%', key: 'name' },
  { title: '6개월', value: '6month', align: 'center', width: '12%', key: '6month' },
  { title: '12개월', value: '12month', align: 'center', width: '12%', key: '12month' },
  { title: '24개월', value: '24month', align: 'center', width: '12%', key: '24month' },
] as const);

const deposits: Ref<{ [x: string]: any }[]> = ref([]);

const depositLength = computed(() => {
  return deposits.value.length;
});
const banks = ref(['전체 보기']);
const selectedBank = ref('전체 보기');
const selectedDepositSimple = ref();
const selectedDeposit = ref();
const selectedDepositCode = computed(() => {
  return selectedDepositSimple.value?.['deposit_code'];
});
const dialog = ref(false);

const intrRate = ref([null, null, null, null]);
const intrRate2 = ref([null, null, null, null]);

const isContractDeposit = computed(() => {
  return userStore.userInfo?.contract_deposit.some(
    (e: { [x: string]: any }) => e['deposit_code'] === selectedDepositCode.value,
  );
});

const userStore = useUserStore();
const router = useRouter();

const makeItems = function (item: { [x: string]: any }) {
  const result = {
    deposit_code: item['deposit_code'],
    dcls_month: item['dcls_month'],
    kor_co_nm: item['kor_co_nm'],
    name: item['name'],
    '6month': null,
    '12month': null,
    '24month': null,
    '35month': null,
  };

  for (const option of item['depositoption_set']) {
    const saveTrm = option['save_trm'];

    if (saveTrm === '6') {
      result['6month'] = option['intr_rate'];
    } else if (saveTrm === '12') {
      result['12month'] = option['intr_rate'];
    } else if (saveTrm === '24') {
      result['24month'] = option['intr_rate'];
    }
  }

  return result;
};

const getAllDeposit = function () {
  instance
    .get(`/financial/deposit_list/`)
    .then((res) => {
      const results = res.data;
      for (const item of results) {
        const makeItems = function (item: { [x: string]: any }): { [x: string]: any } {
          const result: { [x: string]: any } = {
            deposit_code: item['deposit_code'],
            dcls_month: item['dcls_month'],
            kor_co_nm: item['kor_co_nm'],
            name: item['name'],
            '6month': null,
            '12month': null,
            '24month': null,
            '35month': null,
          };

          for (const option of item['depositoption_set']) {
            const saveTrm = option['save_trm'];

            if (saveTrm === '6') {
              result['6month'] = option['intr_rate'];
            } else if (saveTrm === '12') {
              result['12month'] = option['intr_rate'];
            } else if (saveTrm === '24') {
              result['24month'] = option['intr_rate'];
            }
          }

          return result;
        };

        deposits.value.push(makeItems(item));
        if (!banks.value.includes(item['kor_co_nm'])) {
          banks.value.push(item['kor_co_nm']);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  getAllDeposit();
});

const clickBank = function () {
  if (selectedBank.value === '전체 보기') {
    getAllDeposit();
  } else {
    instance
      .get(`/financial/get_bank_deposit/${selectedBank.value}/`)
      .then((res) => {
        deposits.value = [];
        const results = res.data;
        for (const item of results) {
          deposits.value.push(makeItems(item));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const close = function () {
  dialog.value = false;
};

const clickRow = function (data: any) {
  selectedDepositSimple.value = data;
  intrRate.value = [];
  intrRate2.value = [];
  getDeposit();
  dialog.value = true;
};

const getDeposit = function () {
  instance
    .get(`/financial/deposit_list/${selectedDepositCode.value}/`)
    .then((res) => {
      const data = res.data;
      selectedDeposit.value = {
        '가입자 수 (Yamujin-Travel 기준)': data.contract_user.length,
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
      const optionList = res.data.depositoption_set;

      for (const option of optionList) {
        if (option.save_trm === '6') {
          intrRate.value[0] = option.intr_rate;
          intrRate2.value[0] = option.intr_rate2;
        } else if (option.save_trm === '12') {
          intrRate.value[1] = option.intr_rate;
          intrRate2.value[1] = option.intr_rate2;
        } else if (option.save_trm === '24') {
          intrRate.value[2] = option.intr_rate;
          intrRate2.value[2] = option.intr_rate2;
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const addDepositUser = function () {
  authInstance
    .post(`/financial/deposit_list/${selectedDepositCode.value}/contract/`)
    .then(() => {
      userStore.getUserInfo(userStore.userInfo.username);
      const answer = window.confirm('저장이 완료되었습니다.\n가입 상품 관리 페이지로 가시겠습니까?');
      if (answer) {
        router.push({ name: 'profile' });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteDepositUser = function () {
  authInstance
    .delete(`/financial/deposit_list/${selectedDepositCode.value}/contract/`)
    .then(() => {
      userStore.getUserInfo(userStore.userInfo.username);
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

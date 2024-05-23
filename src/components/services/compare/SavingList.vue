<template>
  <div class="flex flex-col items-center w-full gap-[2rem] pb-[4rem]">
    <h1 class="text-[2.25rem] font-medium w-3/4"><span class="text-airbnb">정기적금</span> 비교하기</h1>
    <div class="flex items-center justify-end w-3/4">
      <div class="w-1/4 mb-5">
        <v-btn-toggle v-model="selectedTypeRsrv" variant="outlined" color="#FD5C63" group class="mx-5">
          <v-btn value="자유적립식"> 자유 적금 </v-btn>
          <v-btn value="정액적립식"> 정기 적금 </v-btn>
        </v-btn-toggle>
      </div>
      <div class="flex items-center justify-center w-1/4">
        <v-select
          variant="outlined"
          color="#FD5C63"
          label="은행"
          :items="banks"
          v-model="selectedBank"
          @update:modelValue="clickBank"
        ></v-select>
      </div>
    </div>

    <v-dialog v-model="dialog" class="w-3/4">
      <v-card v-if="selectedSaving" class="px-3 py-5">
        <v-card-title class="d-flex align-center justify-space-between">
          <h3>{{ selectedSaving['금융 상품명'] }}</h3>
          <div v-if="userStore.isAuthenticated">
            <v-btn v-if="isContractSaving" color="red" variant="flat" @click.prevent="deleteSavingUser"
              >가입 취소하기</v-btn
            >
            <v-btn v-else color="#FD5C63" variant="flat" @click.prevent="addSavingUser">가입하기</v-btn>
          </div>
        </v-card-title>

        <v-card-text>
          <v-table>
            <tbody>
              <tr v-for="(value, key) in selectedSaving" :key="key">
                <td width="28%" class="font-weight-bold">{{ key }}</td>
                <td v-if="key === '최고 한도'">{{ value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                <td v-else>{{ value }}</td>
              </tr>
            </tbody>
          </v-table>
          <v-divider class="my-3"></v-divider>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#1089FF" variant="text" @click="close"> 닫기 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-table-virtual
      v-if="savingLength !== 0"
      :headers="headers"
      fixed-header
      :items-length="savingLength"
      :items="savings"
      item-value="saving_code"
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
import { ref, Ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/modules/users';
import { instance, getAuthInstance } from '@/api/axios';
const authInstance = getAuthInstance();

const headers = [
  { title: '공시 제출일', align: 'center', sortable: false, width: '10%', key: 'dcls_month' },
  { title: '금융회사명', align: 'center', sortable: false, key: 'kor_co_nm' },
  { title: '상품명', align: 'center', sortable: false, width: '32%', key: 'name' },
  { title: '6개월', align: 'center', width: '12%', key: '6month' },
  { title: '12개월', align: 'center', width: '12%', key: '12month' },
  { title: '24개월', align: 'center', width: '12%', key: '24month' },
];

const results = ref();
const savings: Ref<{ [x: string]: any }[]> = ref([]);
const savingLength = computed(() => {
  return savings.value.length;
});
const banks = ref(['전체 보기']);
const selectedBank = ref('전체 보기');
const selectedSavingSimple = ref();
const selectedSaving = ref();
const selectedSavingCode = computed(() => {
  return selectedSavingSimple.value?.['saving_code'];
});
const dialog = ref(false);

const averageIntrRate = [2.78, 3.62, 3.57, 3.52];
const intrRateF = ref([null, null, null, null]);
const intrRate2F = ref([null, null, null, null]);
const intrRateS = ref([null, null, null, null]);
const intrRate2S = ref([null, null, null, null]);

const selectedTypeRsrv = ref('자유적립식');

const isContractSaving = computed(() => {
  return userStore.userInfo?.contract_saving.some(
    (e: { [x: string]: any }) => e['saving_code'] === selectedSavingCode.value,
  );
});

const userStore = useUserStore();
const router = useRouter();

const makeItems = function (item: { [x: string]: any }) {
  const result = {
    saving_code: item['saving_code'],
    dcls_month: item['dcls_month'],
    kor_co_nm: item['kor_co_nm'],
    name: item['name'],
    '6month': null,
    '12month': null,
    '24month': null,
    '35month': null,
  };

  for (const option of item['savingoption_set']) {
    const saveTrm = option['save_trm'];
    const rsrvTypeNm = option['rsrv_type_nm'];

    if (rsrvTypeNm === selectedTypeRsrv.value) {
      if (saveTrm === '6') {
        result['6month'] = option['intr_rate'];
      } else if (saveTrm === '12') {
        result['12month'] = option['intr_rate'];
      } else if (saveTrm === '24') {
        result['24month'] = option['intr_rate'];
      }
    }
  }

  return result;
};

const getAllSaving = function () {
  instance.get(`/financial/saving_list/`).then((res) => {
    results.value = res.data;
    for (const item of results.value) {
      const makeItems = function (item: { [x: string]: any }): { [x: string]: any } {
        const result: { [x: string]: any } = {
          saving_code: item['saving_code'],
          dcls_month: item['dcls_month'],
          kor_co_nm: item['kor_co_nm'],
          name: item['name'],
          '6month': null,
          '12month': null,
          '24month': null,
          '35month': null,
        };

        for (const option of item['savingoption_set']) {
          const saveTrm = option['save_trm'];
          const rsrvTypeNm = option['rsrv_type_nm'];

          if (rsrvTypeNm === selectedTypeRsrv.value) {
            if (saveTrm === '6') {
              result['6month'] = option['intr_rate'];
            } else if (saveTrm === '12') {
              result['12month'] = option['intr_rate'];
            } else if (saveTrm === '24') {
              result['24month'] = option['intr_rate'];
            }
          }
        }

        return result;
      };

      savings.value.push(makeItems(item));
      if (!banks.value.includes(item['kor_co_nm'])) {
        banks.value.push(item['kor_co_nm']);
      }
    }
  });
};

onMounted(() => {
  getAllSaving();
});

const clickBank = function () {
  if (selectedBank.value === '전체 보기') {
    getAllSaving();
  } else {
    instance
      .get(`/financial/get_bank_saving/${selectedBank.value}/`)
      .then((res) => {
        savings.value = [];
        const results = res.data;
        for (const item of results) {
          savings.value.push(makeItems(item));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

watch(selectedTypeRsrv, () => {
  savings.value = [];
  selectedBank.value = '전체 보기';
  for (const item of results.value) {
    savings.value.push(makeItems(item));
    if (!banks.value.includes(item['kor_co_nm'])) {
      banks.value.push(item['kor_co_nm']);
    }
  }
});

const close = function () {
  dialog.value = false;
};

const clickRow = function (data: any) {
  selectedSavingSimple.value = data;
  intrRateF.value = [];
  intrRate2F.value = [];
  intrRateS.value = [];
  intrRate2S.value = [];
  getSaving();
  dialog.value = true;
};

const getSaving = function () {
  instance
    .get(`/financial/saving_list/${selectedSavingCode.value}/`)
    .then((res) => {
      const data = res.data;
      selectedSaving.value = {
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
    })
    .catch((err) => {
      console.log(err);
    });
};

const addSavingUser = function () {
  authInstance
    .post(`/financial/saving_list/${selectedSavingCode.value}/contract/`)
    .then((res) => {
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

const deleteSavingUser = function () {
  authInstance
    .delete(`/financial/saving_list/${selectedSavingCode.value}/contract/`)
    .then((res) => {
      userStore.getUserInfo(userStore.userInfo.username);
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

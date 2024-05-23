<template>
  <div class="w-full">
    <div class="flex">
      <div class="w-full h-[35vw] bg-[#F76D74] flex items-center justify-center">
        <searchBankIcon name="webMockup" />
      </div>
      <div class="w-[58vw] h-[30vw] bg-background-200 flex flex-col items-center justify-center">
        <searchBankIcon name="search" />
        <h3 class="my-5 text-4xl font-bold text-semiBlack">주변 은행 검색</h3>
        <p class="text-2xl text-semiBlack">손쉽게 주변 은행을 찾아보세요 !</p>
      </div>
    </div>
    <div class="flex flex-col items-center px-32 pb-10">
      <div class="flex pt-20 pb-10">
        <div class="flex flex-col mr-[5vw]">
          <v-select
            v-model="selectedCity"
            name="city"
            id="city"
            :items="CityList"
            item-text="name"
            item-value="value"
            variant="outlined"
            color="#FD5C63"
            label="광역시/도"
            class="w-[20rem]"
          >
          </v-select>
        </div>
        <div class="flex flex-col mr-[5vw]">
          <v-select
            v-if="!selectedCity"
            disabled
            variant="outlined"
            color="#FD5C63"
            label="광역시/도를 먼저 선택 해주세요."
            class="w-[20rem]"
          ></v-select>

          <v-select
            v-if="selectedCity === '서울특별시'"
            v-model="selectedDistrict"
            :items="SeoulList"
            item-text="name"
            item-value="value"
            variant="outlined"
            color="#FD5C63"
            label="시/군/구"
            class="w-[20rem]"
          >
          </v-select>
          <v-select
            v-if="selectedCity === '부산광역시'"
            v-model="selectedDistrict"
            :items="BusanList"
            item-text="name"
            item-value="value"
            variant="outlined"
            color="#FD5C63"
            label="시/군/구"
            class="w-[20rem]"
          >
          </v-select>
          <v-select
            v-if="selectedCity === '대구광역시'"
            v-model="selectedDistrict"
            :items="DaeguList"
            item-text="name"
            item-value="value"
            variant="outlined"
            color="#FD5C63"
            label="시/군/구"
            class="w-[20rem]"
          >
          </v-select>
          <v-select
            v-if="selectedCity === '인천광역시'"
            v-model="selectedDistrict"
            :items="IncheonList"
            item-text="name"
            item-value="value"
            variant="outlined"
            color="#FD5C63"
            label="시/군/구"
            class="w-[20rem]"
          >
          </v-select>
          <v-select
            v-if="selectedCity === '광주광역시'"
            v-model="selectedDistrict"
            :items="GwangjuList"
            item-text="name"
            item-value="value"
            variant="outlined"
            color="#FD5C63"
            label="시/군/구"
            class="w-[20rem]"
          >
          </v-select>
          <v-select
            v-if="selectedCity === '대전광역시'"
            v-model="selectedDistrict"
            :items="DaejeonList"
            item-text="name"
            item-value="value"
            variant="outlined"
            color="#FD5C63"
            label="시/군/구"
            class="w-[20rem]"
          >
          </v-select>
          <v-select
            v-if="selectedCity === '울산광역시'"
            v-model="selectedDistrict"
            :items="UlsanList"
            item-text="name"
            item-value="value"
            variant="outlined"
            color="#FD5C63"
            label="시/군/구"
            class="w-[20rem]"
          >
          </v-select>
          <v-select
            v-if="selectedCity === '세종특별자치시'"
            v-model="selectedDistrict"
            :items="SejongList"
            item-text="name"
            item-value="value"
            variant="outlined"
            color="#FD5C63"
            label="시/군/구"
            class="w-[20rem]"
          >
          </v-select>
          <v-select
            v-if="selectedCity === '경기도'"
            v-model="selectedDistrict"
            :items="GyeonggiList"
            item-text="name"
            item-value="value"
            variant="outlined"
            color="#FD5C63"
            label="시/군/구"
            class="w-[20rem]"
          >
          </v-select>
          <v-select
            v-if="selectedCity === '강원도'"
            v-model="selectedDistrict"
            :items="GangwonList"
            item-text="name"
            item-value="value"
            variant="outlined"
            color="#FD5C63"
            label="시/군/구"
            class="w-[20rem]"
          >
          </v-select>
          <v-select
            v-if="selectedCity === '충청북도'"
            v-model="selectedDistrict"
            :items="ChungbukList"
            item-text="name"
            item-value="value"
            variant="outlined"
            color="#FD5C63"
            label="시/군/구"
            class="w-[20rem]"
          >
          </v-select>
          <v-select
            v-if="selectedCity === '충청남도'"
            v-model="selectedDistrict"
            :items="ChungnamList"
            item-text="name"
            item-value="value"
            variant="outlined"
            color="#FD5C63"
            label="시/군/구"
            class="w-[20rem]"
          >
          </v-select>
          <v-select
            v-if="selectedCity === '전라북도'"
            v-model="selectedDistrict"
            :items="JeonbukList"
            item-text="name"
            item-value="value"
            variant="outlined"
            color="#FD5C63"
            label="시/군/구"
            class="w-[20rem]"
          >
          </v-select>
          <v-select
            v-if="selectedCity === '전라남도'"
            v-model="selectedDistrict"
            :items="JeonnamList"
            item-text="name"
            item-value="value"
            variant="outlined"
            color="#FD5C63"
            label="시/군/구"
            class="w-[20rem]"
          >
          </v-select>
          <v-select
            v-if="selectedCity === '경상북도'"
            v-model="selectedDistrict"
            :items="GyeongbukList"
            item-text="name"
            item-value="value"
            variant="outlined"
            color="#FD5C63"
            label="시/군/구"
            class="w-[20rem]"
          >
          </v-select>
          <v-select
            v-if="selectedCity === '경상남도'"
            v-model="selectedDistrict"
            :items="GyeongnamList"
            item-text="name"
            item-value="value"
            variant="outlined"
            color="#FD5C63"
            label="시/군/구"
            class="w-[20rem]"
          >
          </v-select>
          <v-select
            v-if="selectedCity === '제주특별자치도'"
            v-model="selectedDistrict"
            :items="JejuList"
            item-text="name"
            item-value="value"
            variant="outlined"
            color="#FD5C63"
            label="시/군/구"
            class="w-[20rem]"
          >
          </v-select>
        </div>
        <div class="flex flex-col">
          <v-select
            v-model="selectedBank"
            :items="BankList"
            item-text="name"
            item-value="value"
            variant="outlined"
            color="#FD5C63"
            label="은행"
            class="w-[20rem]"
          >
          </v-select>
        </div>
      </div>
      <KakaoMap
        :lat="37.50129194777175"
        :lng="127.03961032153232"
        @onLoadKakaoMap="onLoadKakaoMap"
        style="width: 100%; border-radius: 1rem"
      >
        <KakaoMapMarker
          v-for="(marker, index) in markerList"
          :key="marker.key === undefined ? index : marker.key"
          :lat="marker.lat"
          :lng="marker.lng"
          :image="{
            imageSrc: '/src/assets/images/marker.png',
            imageWidth: 40,

            imageHeight: 55,

            imageOption: {},
          }"
          :infoWindow="marker.infoWindow"
          :clickable="true"
          @onClickKakaoMapMarker="onClickMapMarker(marker)"
        />
      </KakaoMap>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useKakao } from 'vue3-kakao-maps/@utils';
import { KakaoMap, KakaoMapMarker, type KakaoMapMarkerListItem } from 'vue3-kakao-maps';
import {
  CityList,
  SeoulList,
  BusanList,
  DaeguList,
  IncheonList,
  GwangjuList,
  DaejeonList,
  UlsanList,
  SejongList,
  GyeonggiList,
  GangwonList,
  ChungbukList,
  ChungnamList,
  JeonbukList,
  JeonnamList,
  GyeongbukList,
  GyeongnamList,
  JejuList,
  BankList,
} from '@/assets/data/searchBank/AddressList.js';

const selectedCity = ref('');
const selectedDistrict = ref('');
const selectedBank = ref('');

const MAP_API_KEY = import.meta.env.VITE_APP_KAKAO_MAP_API_KEY;

useKakao(MAP_API_KEY, ['clusterer', 'services', 'drawing']);

//라이브러리 사용 방법을 반드시 참고하여 주시기 바랍니다.
const map = ref<kakao.maps.Map>();
const markerList = ref<KakaoMapMarkerListItem[]>([]);

const onLoadKakaoMap = (mapRef: kakao.maps.Map) => {
  map.value = mapRef;

  const keyword = computed(() => `${selectedCity.value} ${selectedDistrict.value} ${selectedBank.value}`);

  watch(keyword, (newVal, oldVal) => {
    if (selectedCity.value !== '' && selectedDistrict.value !== '' && selectedBank.value !== '' && newVal !== oldVal) {
      const ps = new kakao.maps.services.Places();

      // 키워드로 장소를 검색
      ps.keywordSearch(newVal, placesSearchCB);
      console.log('keyword:', newVal);
    }
  });
};

// 키워드 검색 완료 시 호출되는 콜백함수 입니다
const placesSearchCB = (data: kakao.maps.services.PlacesSearchResult, status: kakao.maps.services.Status): void => {
  if (status === kakao.maps.services.Status.OK) {
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    // LatLngBounds 객체에 좌표를 추가합니다
    const bounds = new kakao.maps.LatLngBounds();

    for (let marker of data) {
      const markerItem: KakaoMapMarkerListItem = {
        lat: Number(marker.y),
        lng: Number(marker.x),
        infoWindow: {
          content: marker.place_name,
          visible: false,
        },
      };
      markerList.value.push(markerItem);
      bounds.extend(new kakao.maps.LatLng(Number(marker.y), Number(marker.x)));
    }

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.value?.setBounds(bounds);
  }
};

//마커 클릭 시 인포윈도우의 visible 값을 반전시킵니다
const onClickMapMarker = (markerItem: KakaoMapMarkerListItem): void => {
  if (markerItem.infoWindow?.visible !== null && markerItem.infoWindow?.visible !== undefined) {
    markerItem.infoWindow.visible = !markerItem.infoWindow.visible;
  } else {
    if (markerItem.infoWindow) {
      markerItem.infoWindow.visible = true;
    }
  }
};
</script>

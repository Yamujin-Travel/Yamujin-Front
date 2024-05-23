<template>
  <div class="w-full">
    <div class="flex">
      <div class="w-full h-[35vw] bg-[#A7E1EA] flex items-center justify-center">
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
          <label for="city" class="pb-2 pl-8 text-lg font-medium text-left text-smokeBlack">광역시/도</label>
          <select
            v-model="selectedCity"
            name="city"
            id="city"
            class="h-16 border-2 outline-none w-80 rounded-2xl border-gray focus:border-airbnb"
          >
            <option value="서울특별시">서울특별시</option>
            <option value="부산광역시">부산광역시</option>
            <option value="대구광역시">대구광역시</option>
            <option value="인천광역시">인천광역시</option>
            <option value="광주광역시">광주광역시</option>
            <option value="대전광역시">대전광역시</option>
            <option value="울산광역시">울산광역시</option>
            <option value="세종특별자치시">세종특별자치시</option>
            <option value="경기도">경기도</option>
            <option value="강원도">강원도</option>
            <option value="충청북도">충청북도</option>
            <option value="충청남도">충청남도</option>
            <option value="전라북도">전라북도</option>
            <option value="전라남도">전라남도</option>
            <option value="경상북도">경상북도</option>
            <option value="경상남도">경상남도</option>
            <option value="제주특별자치도">제주특별자치도</option>
          </select>
        </div>
        <div class="flex flex-col mr-[5vw]">
          <label for="district" class="pb-2 pl-8 text-lg font-medium text-left text-smokeBlack focus:text-airbnb"
            >시/군/구</label
          >
          <select
            v-if="!selectedCity"
            disabled
            name="district"
            id="district"
            class="h-16 border-2 outline-none w-80 rounded-2xl border-gray focus:border-airbnb"
          ></select>

          <select
            v-if="selectedCity === '서울특별시'"
            v-model="selectedDistrict"
            name="district"
            id="district"
            class="h-16 border-2 outline-none w-80 rounded-2xl border-gray focus:border-airbnb"
          >
            <option value="종로구">종로구</option>
            <option value="중구">중구</option>
            <option value="용산구">용산구</option>
            <option value="성동구">성동구</option>
            <option value="광진구">광진구</option>
            <option value="동대문구">동대문구</option>
            <option value="중랑구">중랑구</option>
            <option value="성북구">성북구</option>
            <option value="강북구">강북구</option>
            <option value="도봉구">도봉구</option>
            <option value="노원구">노원구</option>
            <option value="은평구">은평구</option>
            <option value="서대문구">서대문구</option>
            <option value="마포구">마포구</option>
            <option value="양천구">양천구</option>
            <option value="강서구">강서구</option>
            <option value="구로구">구로구</option>
            <option value="금천구">금천구</option>
            <option value="영등포구">영등포구</option>
            <option value="동작구">동작구</option>
            <option value="관악구">관악구</option>
            <option value="서초구">서초구</option>
            <option value="강남구">강남구</option>
            <option value="송파구">송파구</option>
            <option value="강동구">강동구</option>
          </select>
          <select
            v-if="selectedCity === '부산광역시'"
            v-model="selectedDistrict"
            name="district"
            id="district"
            class="h-16 border-2 outline-none w-80 rounded-2xl border-gray focus:border-airbnb"
          >
            <option value="중구">중구</option>
            <option value="서구">서구</option>
            <option value="동구">동구</option>
            <option value="영도구">영도구</option>
            <option value="부산진구">부산진구</option>
            <option value="동래구">동래구</option>
            <option value="남구">남구</option>
            <option value="북구">북구</option>
            <option value="해운대구">해운대구</option>
            <option value="사하구">사하구</option>
            <option value="금정구">금정구</option>
            <option value="강서구">강서구</option>
            <option value="연제구">연제구</option>
            <option value="수영구">수영구</option>
            <option value="사상구">사상구</option>
            <option value="기장군">기장군</option>
          </select>
          <select
            v-if="selectedCity === '대구광역시'"
            v-model="selectedDistrict"
            name="district"
            id="district"
            class="h-16 border-2 outline-none w-80 rounded-2xl border-gray focus:border-airbnb"
          >
            <option value="중구">중구</option>
            <option value="동구">동구</option>
            <option value="서구">서구</option>
            <option value="남구">남구</option>
            <option value="북구">북구</option>
            <option value="수성구">수성구</option>
            <option value="달서구">달서구</option>
            <option value="달성군">달성군</option>
          </select>
          <select
            v-if="selectedCity === '인천광역시'"
            v-model="selectedDistrict"
            name="district"
            id="district"
            class="h-16 border-2 outline-none w-80 rounded-2xl border-gray focus:border-airbnb"
          >
            <option value="중구">중구</option>
            <option value="동구">동구</option>
            <option value="남동구">남동구</option>
            <option value="연수구">연수구</option>
            <option value="미추홀구">미추홀구</option>
            <option value="서구">서구</option>
            <option value="계양구">계양구</option>
            <option value="강화군">강화군</option>
            <option value="옹진군">옹진군</option>
          </select>
          <select
            v-if="selectedCity === '광주광역시'"
            v-model="selectedDistrict"
            name="district"
            id="district"
            class="h-16 border-2 outline-none w-80 rounded-2xl border-gray focus:border-airbnb"
          >
            <option value="동구">동구</option>
            <option value="서구">서구</option>
            <option value="남구">남구</option>
            <option value="북구">북구</option>
            <option value="광산구">광산구</option>
          </select>
          <select
            v-if="selectedCity === '대전광역시'"
            v-model="selectedDistrict"
            name="district"
            id="district"
            class="h-16 border-2 outline-none w-80 rounded-2xl border-gray focus:border-airbnb"
          >
            <option value="동구">동구</option>
            <option value="중구">중구</option>
            <option value="서구">서구</option>
            <option value="유성구">유성구</option>
            <option value="대덕구">대덕구</option>
          </select>
          <select
            v-if="selectedCity === '울산광역시'"
            v-model="selectedDistrict"
            name="district"
            id="district"
            class="h-16 border-2 outline-none w-80 rounded-2xl border-gray focus:border-airbnb"
          >
            <option value="중구">중구</option>
            <option value="남구">남구</option>
            <option value="동구">동구</option>
            <option value="북구">북구</option>
            <option value="울주군">울주군</option>
          </select>
          <select
            v-if="selectedCity === '세종특별자치시'"
            v-model="selectedDistrict"
            name="district"
            id="district"
            class="h-16 border-2 outline-none w-80 rounded-2xl border-gray focus:border-airbnb"
          >
            <option value="세종특별자치시">세종특별자치시</option>
          </select>
          <select
            v-if="selectedCity === '경기도'"
            v-model="selectedDistrict"
            name="district"
            id="district"
            class="h-16 border-2 outline-none w-80 rounded-2xl border-gray focus:border-airbnb"
          >
            <option value="수원시">수원시</option>
            <option value="고양시">고양시</option>
            <option value="용인시">용인시</option>
            <option value="성남시">성남시</option>
            <option value="부천시">부천시</option>
            <option value="안양시">안양시</option>
            <option value="안산시">안산시</option>
            <option value="남양주시">남양주시</option>
            <option value="화성시">화성시</option>
            <option value="평택시">평택시</option>
            <option value="시흥시">시흥시</option>
            <option value="군포시">군포시</option>
            <option value="광명시">광명시</option>
            <option value="구리시">구리시</option>
            <option value="하남시">하남시</option>
            <option value="오산시">오산시</option>
            <option value="이천시">이천시</option>
            <option value="안성시">안성시</option>
            <option value="의정부시">의정부시</option>
            <option value="가평군">가평군</option>
            <option value="양평군">양평군</option>
            <option value="과천시">과천시</option>
            <option value="동두천시">동두천시</option>
            <option value="파주시">파주시</option>
            <option value="포천시">포천시</option>
          </select>
          <select
            v-if="selectedCity === '강원도'"
            v-model="selectedDistrict"
            name="district"
            id="district"
            class="h-16 border-2 outline-none w-80 rounded-2xl border-gray focus:border-airbnb"
          >
            <option value="춘천시">춘천시</option>
            <option value="원주시">원주시</option>
            <option value="강릉시">강릉시</option>
            <option value="동해시">동해시</option>
            <option value="삼척시">삼척시</option>
            <option value="태백시">태백시</option>
            <option value="속초시">속초시</option>
            <option value="홍천군">홍천군</option>
            <option value="횡성군">횡성군</option>
            <option value="평창군">평창군</option>
            <option value="정선군">정선군</option>
            <option value="고성군">고성군</option>
            <option value="양구군">양구군</option>
            <option value="인제군">인제군</option>
            <option value="양양군">양양군</option>
          </select>
          <select
            v-if="selectedCity === '충청북도'"
            v-model="selectedDistrict"
            name="district"
            id="district"
            class="h-16 border-2 outline-none w-80 rounded-2xl border-gray focus:border-airbnb"
          >
            <option value="청주시">청주시</option>
            <option value="충주시">충주시</option>
            <option value="제천시">제천시</option>
            <option value="보은군">보은군</option>
            <option value="옥천군">옥천군</option>
            <option value="영동군">영동군</option>
            <option value="증평군">증평군</option>
            <option value="진천군">진천군</option>
            <option value="괴산군">괴산군</option>
            <option value="음성군">음성군</option>
          </select>
          <select
            v-if="selectedCity === '충청남도'"
            v-model="selectedDistrict"
            name="district"
            id="district"
            class="h-16 border-2 outline-none w-80 rounded-2xl border-gray focus:border-airbnb"
          >
            <option value="천안시">천안시</option>
            <option value="공주시">공주시</option>
            <option value="보령시">보령시</option>
            <option value="아산시">아산시</option>
            <option value="서산시">서산시</option>
            <option value="논산시">논산시</option>
            <option value="계룡시">계룡시</option>
            <option value="당진시">당진시</option>
            <option value="금산군">금산군</option>
            <option value="부여군">부여군</option>
            <option value="서천군">서천군</option>
            <option value="청양군">청양군</option>
            <option value="홍성군">홍성군</option>
            <option value="예산군">예산군</option>
            <option value="태안군">태안군</option>
          </select>
          <select
            v-if="selectedCity === '전라북도'"
            v-model="selectedDistrict"
            name="district"
            id="district"
            class="h-16 border-2 outline-none w-80 rounded-2xl border-gray focus:border-airbnb"
          >
            <option value="전주시">전주시</option>
            <option value="군산시">군산시</option>
            <option value="익산시">익산시</option>
            <option value="정읍시">정읍시</option>
            <option value="남원시">남원시</option>
            <option value="김제시">김제시</option>
            <option value="완주군">완주군</option>
            <option value="진안군">진안군</option>
            <option value="무주군">무주군</option>
            <option value="장수군">장수군</option>
            <option value="임실군">임실군</option>
            <option value="순창군">순창군</option>
            <option value="고창군">고창군</option>
            <option value="부안군">부안군</option>
          </select>
          <select
            v-if="selectedCity === '전라남도'"
            v-model="selectedDistrict"
            name="district"
            id="district"
            class="h-16 border-2 outline-none w-80 rounded-2xl border-gray focus:border-airbnb"
          >
            <option value="목포시">목포시</option>
            <option value="여수시">여수시</option>
            <option value="순천시">순천시</option>
            <option value="나주시">나주시</option>
            <option value="광양시">광양시</option>
            <option value="담양군">담양군</option>
            <option value="곡성군">곡성군</option>
            <option value="구례군">구례군</option>
            <option value="고흥군">고흥군</option>
            <option value="보성군">보성군</option>
            <option value="화순군">화순군</option>
            <option value="장흥군">장흥군</option>
            <option value="강진군">강진군</option>
            <option value="해남군">해남군</option>
            <option value="영암군">영암군</option>
            <option value="무안군">무안군</option>
            <option value="함평군">함평군</option>
            <option value="영광군">영광군</option>
            <option value="장성군">장성군</option>
            <option value="완도군">완도군</option>
            <option value="진도군">진도군</option>
            <option value="신안군">신안군</option>
          </select>
          <select
            v-if="selectedCity === '경상북도'"
            v-model="selectedDistrict"
            name="district"
            id="district"
            class="h-16 border-2 outline-none w-80 rounded-2xl border-gray focus:border-airbnb"
          >
            <option value="포항시">포항시</option>
            <option value="경주시">경주시</option>
            <option value="김천시">김천시</option>
            <option value="안동시">안동시</option>
            <option value="구미시">구미시</option>
            <option value="영주시">영주시</option>
            <option value="영천시">영천시</option>
            <option value="상주시">상주시</option>
            <option value="문경시">문경시</option>
            <option value="경산시">경산시</option>
            <option value="군위군">군위군</option>
            <option value="의성군">의성군</option>
            <option value="청도군">청도군</option>
            <option value="고령군">고령군</option>
            <option value="성주군">성주군</option>
            <option value="칠곡군">칠곡군</option>
            <option value="영덕군">영덕군</option>
            <option value="영양군">영양군</option>
            <option value="봉화군">봉화군</option>
            <option value="울진군">울진군</option>
            <option value="울릉군">울릉군</option>
          </select>
          <select
            v-if="selectedCity === '경상남도'"
            v-model="selectedDistrict"
            name="district"
            id="district"
            class="h-16 border-2 outline-none w-80 rounded-2xl border-gray focus:border-airbnb"
          >
            <option value="창원시">창원시</option>
            <option value="진주시">진주시</option>
            <option value="통영시">통영시</option>
            <option value="사천시">사천시</option>
            <option value="김해시">김해시</option>
            <option value="밀양시">밀양시</option>
            <option value="거제시">거제시</option>
            <option value="양산시">양산시</option>
            <option value="의령군">의령군</option>
            <option value="함안군">함안군</option>
            <option value="창녕군">창녕군</option>
            <option value="고성군">고성군</option>
            <option value="남해군">남해군</option>
            <option value="하동군">하동군</option>
            <option value="산청군">산청군</option>
            <option value="함양군">함양군</option>
            <option value="거창군">거창군</option>
            <option value="합천군">합천군</option>
          </select>
          <select
            v-if="selectedCity === '제주특별자치도'"
            v-model="selectedDistrict"
            name="district"
            id="district"
            class="h-16 border-2 outline-none w-80 rounded-2xl border-gray focus:border-airbnb"
          >
            <option value="제주시">제주시</option>
            <option value="서귀포시">서귀포시</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label for="bank" class="pb-2 pl-8 text-lg font-medium text-left text-smokeBlack">은행</label>
          <select
            v-model="selectedBank"
            name="bank"
            id="bank"
            class="h-16 border-2 outline-none w-80 rounded-2xl border-gray focus:border-airbnb"
          >
            <option value="한국은행">한국은행</option>
            <option value="산업은행">산업은행</option>
            <option value="기업은행">기업은행</option>
            <option value="국민은행">국민은행</option>
            <option value="외환은행">외환은행</option>
            <option value="수협중앙회">수협중앙회</option>
            <option value="수출입은행">수출입은행</option>
            <option value="농협은행">농협은행</option>
            <option value="농협중앙회">농협중앙회</option>
            <option value="우리은행">우리은행</option>
            <option value="SC제일은행">SC제일은행</option>
            <option value="한국씨티은행">한국씨티은행</option>
            <option value="대구은행">대구은행</option>
            <option value="부산은행">부산은행</option>
            <option value="광주은행">광주은행</option>
            <option value="제주은행">제주은행</option>
            <option value="전북은행">전북은행</option>
            <option value="경남은행">경남은행</option>
            <option value="새마을금고중앙회">새마을금고중앙회</option>
            <option value="신협중앙회">신협중앙회</option>
            <option value="상호저축은행">상호저축은행</option>
            <option value="모건스탠리은행">모건스탠리은행</option>
            <option value="HSBC은행">HSBC은행</option>
            <option value="도이치은행">도이치은행</option>
            <option value="제이피모간체이스은행">제이피모간체이스은행</option>
            <option value="미즈호은행">미즈호은행</option>
            <option value="엠유에프지은행">엠유에프지은행</option>
            <option value="BOA은행">BOA은행</option>
            <option value="비엔피파리바은행">비엔피파리바은행</option>
            <option value="중국공상은행">중국공상은행</option>
            <option value="중국은행">중국은행</option>
            <option value="산림조합중앙회">산림조합중앙회</option>
            <option value="우체국">우체국</option>
            <option value="KEB하나은행">KEB하나은행</option>
            <option value="신한은행">신한은행</option>
            <option value="케이뱅크">케이뱅크</option>
            <option value="카카오뱅크">카카오뱅크</option>
            <option value="토스뱅크">토스뱅크</option>
          </select>
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

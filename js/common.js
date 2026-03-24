$(document).ready(function () {//시작
  AOS.init();

  //header
  $("header nav .gnb > li").mouseenter(function () {
    $(this).children(".depth2").stop().fadeIn();
  });
  $("header nav .gnb > li").mouseleave(function () {
    $(this).children(".depth2").stop().fadeOut();
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $("header").addClass("on");
    } else {
      $("header").removeClass("on");
    }
  });

  //mgnb
  $(".mgnb > li").click(function () {
    $(this).children(".mdepth2").slideToggle();
    $(this).siblings().children(".mdepth2").slideUp();
  });
  $(".mgnb-ham").click(function () {
    $(".mgnb-dim").show();
    $(".mgnb-wrap").animate({ right: '0' });
  });
  $(".mgnb-close").click(function () {
    $(".mgnb-dim").hide();
    $(".mgnb-wrap").animate({ right: '-100%' });
  });

  //section04 효과
  const $section = $('#section04');   // section04 요소 선택 
  const headerHeight = 100;  // 상단 fixed header 높이값

  let isSnapped = false; // 현재 섹션에 스냅된 상태인지  
  let isAnimating = false; // 슬라이드 애니메이션 중인지
  let isLeaving = false; // 섹션을 벗어나는 중인지 (중복 스냅 방지용)


  const guide = new Swiper(".guide", {
    direction: "vertical",        // 세로 슬라이드
    speed: 800,                   // 슬라이드 속도
    effect: "fade",               // 페이드 효과
    fadeEffect: { crossFade: true },
    mousewheel: false,            // Swiper 기본 휠 비활성
    allowTouchMove: true,      // 터치 드래그 
  });

  // 섹션 4로 스크롤 스냅(자석기능)
  function snapToSection() {
    // 섹션 위치 - 헤더 높이
    const sectionTop = $section.offset().top - headerHeight;

    isSnapped = true;

    // 부드럽게 스크롤 이동
    $('html, body').stop().animate({
      scrollTop: sectionTop
    }, 400);
  }

  // 문서 스크롤 시 섹션 중앙에 오면 섹션 4 영역 자동 스냅
  window.addEventListener('scroll', function () {
    if (isSnapped || isLeaving) return; // 이미 스냅되었거나 이탈 중이면 중단
    const rect = $section[0].getBoundingClientRect();

    // 화면 중앙 근처에 들어오면 스냅
    if (rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4) {
      snapToSection();
    }
  });

  // 휠 이벤트 제어
  window.addEventListener('wheel', function (e) {
    if (window.innerWidth <= 420) {
    }
    if (!isSnapped) return; // 스냅 상태 아닐 경우 무시
    const delta = e.deltaY; // 마우스 휠이 세로 방향으로 얼마나 움직였는지 나타내는 값

    if (isAnimating) {      // 슬라이드 전환 중이면 
      e.preventDefault(); //휠 이벤트 무시
      return;
    }
    if (delta > 0) { // 아래로 휠
      if (!guide.isEnd) {
        e.preventDefault();
        isAnimating = true;
        guide.slideNext();
      } else {
        // 마지막 슬라이드가 아래 섹션으로 이동
        isSnapped = false;
        isLeaving = true;

        window.scrollBy({
          top: window.innerHeight,
          behavior: "smooth"
        });
        setTimeout(() => isLeaving = false, 600);
      }
    } else { // 위로 휠
      if (!guide.isBeginning) {
        e.preventDefault();
        isAnimating = true;
        guide.slidePrev();
      } else {
        // 첫 슬라이드가 상위 섹션으로 이동
        isSnapped = false;
        isLeaving = true;

        window.scrollBy({
          top: -window.innerHeight,
          behavior: "smooth"
        });
        setTimeout(() => isLeaving = false, 600);
      }
    }
  },
    { passive: false }); //휠 이벤트를 수동으로 처리하기 위해 처리해 주는 옵션     

  guide.on('slideChangeTransitionEnd', function () {
    isAnimating = false; // 슬라이드 전환 끝나면 애니메이션 상태 해제
  });



  $("#section06 .car").addClass("active");
  $(".car-site").show();
  $(".bicycle-site").hide();
  // 전기 자동차 클릭
  $("#section06 .car").click(function () {
    $(this).addClass("active");
    $(".bicycle").removeClass("active");

    $(".car-site").fadeIn();
    $(".bicycle-site").hide();
  });


  // 전기 자전거 클릭
  $("#section06 .bicycle").click(function () {
    $(this).addClass("active");
    $(".car").removeClass("active");

    $(".bicycle-site").fadeIn();
    $(".car-site").hide();
  });

  // 채팅팝업창
  $(".chat_fixed").hide();

  $(".chat_icon").click(function () {
    $(".chat_fixed").fadeIn();
  });

  $(".chat_fixed .close").click(function () {
    $(".chat_fixed").fadeOut();
  });

  /*sub*/
  const tabs = document.querySelectorAll('.tab');
  const sections = document.querySelectorAll('.section');

  /* 초기 위치 세팅 */
  window.addEventListener('load', () => {
    const activeTab = document.querySelector('.tab.active');

  });

  /* 스크롤 시 자동 이동 */
  window.addEventListener('scroll', () => {
    let current = 'company';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    tabs.forEach(tab => {
      if (tab.getAttribute('data-target') === current) {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      }
    });
  });
  window.addEventListener('scroll', () => {
    let current = 'partnership';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    tabs.forEach(tab => {
      if (tab.getAttribute('data-target') === current) {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      }
    });
  });
  /* 클릭 시 이동 */
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);

      window.scrollTo({
        top: targetSection.offsetTop - 100,
        behavior: 'smooth'
      });
    });
  });

  /*breadcrumb 고정*/
  const breadcrumb = document.querySelector('.breadcrumb');
  const triggerPoint = document.querySelector('.content').offsetTop;

  window.addEventListener('scroll', () => {
    if (window.scrollY >= triggerPoint - 130) {
      breadcrumb.classList.add('fixed');
    } else {
      breadcrumb.classList.remove('fixed');
    }
  });

  window.dispatchEvent(new Event('scroll'));


});//끝
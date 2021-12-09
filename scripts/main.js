import TouchSwiper from './touch-swiper.js';

new TouchSwiper('.touch-slider');
new TouchSwiper('.portfolio-slider', {
  prevSelector: '.portfolio .prev',
  nextSelector: '.portfolio .next',
});

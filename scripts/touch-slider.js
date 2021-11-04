class TouchSlider {
  constructor(selector) {
    this.selector = selector;
    this.dragging = false;
    this.marginOffset = 0;
    this.prevMarginOffset = 0;
    this.direction = 0;
    this.init();
  }

  init() {
    this.el = document.querySelector(this.selector);
    this.wrapper = this.el.querySelector('.slider-wrapper');
    this.onMouseDown = this.handleMouseDown.bind(this);
    this.onMouseUp = this.handleMouseUp.bind(this);
    this.onMouseMove = this.handleMouseMove.bind(this);
    this.el.addEventListener('mousedown', this.onMouseDown);
  }

  handleMouseDown(e) {
    //this.dragging = true;
    e.preventDefault();
    this.initX = e.clientX;
    this.el.addEventListener('mousemove', this.onMouseMove);
    this.el.addEventListener('mouseup', this.onMouseUp);
  }

  handleMouseUp() {
    this.el.removeEventListener('mousemove', this.onMouseMove);
    this.el.removeEventListener('mouseup', this.onMouseUp);
    this.prevMarginOffset = this.marginOffset;
    console.log('úp!');
  }

  handleMouseMove(e) {
    // console.log(this.dragging);
    // if (!this.dragging) return;

    const xDiff = this.initX - e.clientX;
    this.direction = xDiff < 0 ? -1 : 1;
    if (this.prevMarginOffset - xDiff > 0) return;

    let totalChildrenWidth = 0;
    let totalMarginLeft = 0;
    let totalMarginRight = 0;

    [...this.wrapper.children].forEach((child) => {
      const style = window.getComputedStyle(child);
      totalChildrenWidth += child.offsetWidth;
      totalMarginLeft += +style.marginLeft.slice(0, -2);
      totalMarginRight += +style.marginRight.slice(0, -2);
    });

    const paddingRight = +window
      .getComputedStyle(this.wrapper)
      .paddingRight.slice(0, -2);

    if (
      Math.abs(this.prevMarginOffset - xDiff) >
      totalChildrenWidth +
        totalMarginLeft +
        totalMarginRight +
        paddingRight -
        this.wrapper.offsetWidth
    ) {
      //   console.log(
      //     -(
      //       totalChildrenWidth,
      //       totalMarginLeft,
      //       totalMarginRight ,
      //       paddingRight,
      //       this.wrapper.offsetWidth
      //     ),
      //   );
      if (this.direction === 1) {
        console.log('HERE');
        this.marginOffset = -(
          totalChildrenWidth +
          totalMarginLeft +
          totalMarginRight +
          paddingRight -
          this.el.offsetWidth
        );
      } else {
        let a;
        if (
          this.prevMarginOffset >
          -(
            totalChildrenWidth +
            totalMarginLeft +
            totalMarginRight +
            paddingRight -
            this.el.offsetWidth
          )
        ) {
          console.log('inside');
          a = this.prevMarginOffset;
        } else {
          a = -(
            totalChildrenWidth +
            totalMarginLeft +
            totalMarginRight +
            paddingRight -
            this.el.offsetWidth
          );
        }

        this.marginOffset = a - xDiff;
      }
    } else {
      this.marginOffset = this.prevMarginOffset - xDiff;
    }

    this.wrapper.style.marginLeft = this.marginOffset + 'px';
  }
}

const patronsSlider = new TouchSlider('.touch-slider');
console.log(patronsSlider.el);

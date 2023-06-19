class CreatePattern {
    constructor(el, x, y, config = {}) {
        this.root = el
        this.x = x
        this.y = y
        this.options = {
            type: 'point',//样式元素
            quantity: 10,//数量
            distanceMax: 80,//最远距离
            distanceMin: 10,//最近距离
            palette: ['f9f383', 'eb125f', '6eff8a', '66ffff'],//给定的随机颜色
            ...config,
        }
        this.growUp()
    }

    giveBirthToAChild() {
        const initialStyles = document.createElement('p')
        const randomColor =
            this.options.palette[Math.floor(Math.random() * this.options.palette.length)]//随机颜色

        //每次调用一次保证得到不同的值
        const randomTranslateValue = () =>
            (Math.random() < 0.5 ? -1 : 1) *
            (this.options.distanceMin +
                Math.random() * (this.options.distanceMax - this.options.distanceMin))

        this.root.append(initialStyles)
        initialStyles.classList.add(this.options.type)
        setTimeout(() => {
            initialStyles.style.cssText = `background-color:#${randomColor};
            left:${this.x}px;top:${this.y}px;
            z-index:999;
            transform: translate(${randomTranslateValue()}px,${randomTranslateValue()}px) scale(0)`
        }, 0)
        setTimeout(() => {
            initialStyles.remove()
        }, 1000)//存活时间
    }

    growUp() {
        for (let i = 0; i < this.options.quantity; i++) this.giveBirthToAChild()
    }
}

const el = document.createElement('div')

addEventListener('load', () => {
    document.body.append(el)
    //响应鼠标点击
    document.addEventListener('click', function (e) {
        new CreatePattern(el, e.pageX, e.pageY)
    })
})

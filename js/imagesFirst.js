check()

function check() {
    images = document.getElementsByClassName('images')

    if (window.innerWidth < 990) {
        for (let i of images) {
            i.classList.add('order-1')
        }
    } else {
        for (let i of images) {
            i.classList.remove('order-1')
        }
    }
}

window.addEventListener("resize", check)
export default {
    state: {
        backgroundUsed: '',
        mouseCoordinates: {
            x: 0,
            y: 0
        },
        appSize: {
            width: 0,
            height: 0
        }
    },

    mutations: {
        changeBackground(state, background) {
            state.backgroundUsed = background
        },
        updateMouseCoordinates(state, coords) {
            state.mouseCoordinates.x = coords.x
            state.mouseCoordinates.y = coords.y
        },
        updateAppSize(state, size) {
            state.appSize.width = size.width
            state.appSize.height = size.height
        }
    },

    getters: {
        getBackgroundUsed: state => {
            return state.backgroundUsed
        },
        mouseCoordinates: state => {
            const screenSizeDiffX = (window.innerWidth - state.appSize.width) / 2
            const screenSizeDiffY = (window.innerHeight - state.appSize.height) / 2
            return {
                x: state.mouseCoordinates.x - screenSizeDiffX,
                y: state.mouseCoordinates.y - screenSizeDiffY,
            }
        }
    }
}
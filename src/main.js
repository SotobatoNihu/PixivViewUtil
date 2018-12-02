import Vue from 'vue';
import App from './components/App.vue';
import Cog from './components/Cog.vue';
import modal from './components/Modal.vue';
import Util from './lib/util'
import {store} from './lib/store'


/*
TODO
作者ページのタグ切り替え時のエラー対処
うごイラのレイアウト崩れ対処
マンガのホイール動作追加
コメント欄の高さ制限
コメントの追加取得
*/

/**
 * GreaseMonkeyAPIを使い設定をVuexのstoreにロード
 * @type {Util}
 */
const util = new Util();
util.loadGmData(store)

Vue.config.productionTip = true;
/**
 * スクロール画面のドラッグの挙動を設定
 */
Vue.directive('draggable', {
    store: store,
    bind: function (el) {
        el.style.position = 'absolute';
        let startX, startY, initialMouseX, initialMouseY;

        function mousemove(e) {
            let dx = e.clientX - initialMouseX;
            var dy = e.clientY - initialMouseY;
            el.style.top = startY + dy + 'px';
            el.style.left = startX + dx + 'px';
            store.state.screen.dragging = true;
            return false;
        }

        function mouseup(e) {
            document.removeEventListener('mousemove', mousemove);
            document.removeEventListener('mouseup', mouseup);
            if (store.state.screen.dragging || e.target.classList.contains('is-clickable')) {
                store.state.screen.isVisible = true;
            } else {
                store.state.screen.isVisible = false;
            }
            return false;
        }

        el.addEventListener('mousedown', function (e) {
            startX = el.offsetLeft;
            startY = el.offsetTop;
            initialMouseX = e.clientX;
            initialMouseY = e.clientY;
            store.state.screen.dragging = false;
            document.addEventListener('mousemove', mousemove);
            document.addEventListener('mouseup', mouseup);
            return false;
        });
    },
})


window.onload = () => {

    //レイアウトを変更
    util.onloadExecute(store, document.URL);

    const links = document.getElementsByTagName('a')
    for (const link of links) {
        link.addEventListener('click', () => {
            util.onloadExecute(store, document.URL);
        })
    }


    /**
     * 設定画面用のli要素を追加
     */
    const cogID = 'popup-cog'
    const notification = document.getElementsByClassName('notifications')
    if (notification !== null && notification.length > 0 && document.getElementById('cogID') === null) {
        const _li = document.createElement('li')
        const div = document.createElement('div');
        div.id = cogID
        notification[0].appendChild(_li)
        _li.appendChild(div)

        /**
         * 設定画面のVueを作成
         */
        /* eslint-disable no-new */
        const cog = new Vue({
            store: store,
            el: `#popup-cog`,
            components: {
                Cog,
                modal
            },
            template: '<Cog/>',
        });
    }
    const outerContainerID = 'popup-outer-container';
    if (document.getElementById(outerContainerID) === null) {
        const container = document.createElement('div');
        container.id = outerContainerID;
        document.body.appendChild(container);

        /**
         * スクロール画面のVueを作成
         */
        /* eslint-disable no-new */

        const app = new Vue({
            store: store,
            el: `#popup-outer-container`,
            components: {
                App,
            },
            template: '<App v-draggable/>',
        });

    }
}

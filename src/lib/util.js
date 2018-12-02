class PixivJson {
    constructor(json) {
        Object.assign(this, json);
    }
}


export default class Util {

    onloadExecute(store, url) {

        function changeIllustPageLayout() {
            let figures = document.getElementsByTagName('figure')
            let figcaptions = document.getElementsByTagName('figcaption')
            if (figures.length === figcaptions.length) {
                for (let i = 0; i < figures.length; i++) {
                    figures[i].parentNode.insertBefore(figcaptions[i], figures[i]);
                }
            }
        }

        function changeAutherPageLayout() {
            // TODO もっと良い方法
            const h2Elems = document.getElementsByTagName('h2')
            if (typeof h2Elems !== 'undefined') {
                for (const h2elem  of h2Elems) {
                    if (h2elem.innerText.startsWith('イラスト') || h2elem.innerText.startsWith('作品')) {
                        const illustElem = h2elem.parentElement.parentElement
                        const header = document.getElementsByTagName('header')[0]
                        const parent = header.parentNode;
                        parent.insertBefore(illustElem, header.nextSibling)
                        break
                    }
                }
            }
        }

        if (store.state.enable.modifyIllustPage && ~url.indexOf('member_illust.php?mode=medium')) {
            //if(store.state.enable.modifyIllustPage &&  url.match('https://www.pixiv.net/member_illust.php\?mode=medium?')) {
            changeIllustPageLayout()
        } else if (store.state.enable.modifyAutherPage) {
            if (~url.indexOf('member.php?') || ~url.indexOf('member_illust.php?') || ~url.indexOf('bookmark.php?'))
            // if(url.indexOf('member.php?') || url.match('https://www.pixiv.net/member_illust.php?')  || url.match('https://www.pixiv.net/bookmark.php?'))
                changeAutherPageLayout()
        }
    }

    async getPixivJson(illustId) {
        await fetch(`https://www.pixiv.net/ajax/illust/${illustId}`,
            {
                method: 'GET',
                mode: 'cors',
                keepalive: true,
            },
        ).then(function (response) {
            if (response.ok) {
                return response.json();
            }
        }).then(async function (json) {
            return new PixivJson(json);
        });

    }

    async getUgoiraJson(illustId) {
        const url = `https://www.pixiv.net/ajax/illust/${illustId}/ugoira_meta`
        await fetch(url,
            {
                method: 'GET',
                mode: 'cors',
                keepalive: true
            }).then(function (response) {
            if (response.ok) {
                return response.json();
            }
        }).then((json) => {
            return new PixivJson(json)
        })
    }

    async loadGmData(store) {
        await GM.getValue("pixiv_viewutil_setting").then(jsonString => {
            if (jsonString !== undefined) {
                const jsonData = JSON.parse(jsonString);
                store.commit('setAutherPageBool', (jsonData.changeIllustPageLayout == null) ? true : jsonData.changeIllustPageLayout)
                store.commit('setAutherPageBool', (jsonData.changeMemberPageLayout == null) ? true : jsonData.changeMemberPageLayout)
                store.commit('setPopupBool', (jsonData.usePopup == null) ? true : jsonData.usePopup)
                store.commit('setPopupScale', (jsonData.popupScale == null) ? 0.7 : jsonData.popupScale)
            } else {
                store.commit('setAutherPageBool', true)
                store.commit('setAutherPageBool', true)
                store.commit('setPopupBool', true)
                store.commit('setPopupScale', 0.7)
            }
        })
    }

    saveGmData(obj) {
        const jsonObj = JSON.stringify(obj)
        console.log(JSON.stringify(obj))
        GM.setValue("pixiv_viewutil_setting", jsonObj);
    }
}

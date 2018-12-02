import Vue from 'vue';
import Vuex from 'vuex';

import {basicResponse, commentResponse, ugoiraResponse} from './jsonInterface';
import Util from './util';

Vue.use(Vuex);


const artworkType = {
    illust: Symbol('illust'),
    manga: Symbol('manga'),
    ugoira: Symbol('ugoira'),
};
const illustData = {
    imgUrl: '',
};
const mangaData = {
    page: 0,
    imgUrl: [],
};


const state = {
    illustID: 0,
    isUgoira: false,

    enable:{
        modifyIllustPage: true,
        modifyAutherPage: true,
        pupupScreen: true,
    },
    screen: {
        id: 'popup-outer-container',
        elem: {clientWidth: 1000, clientHeight: 1000},
        isVisible: false,
        isLoaded: false,
        top: '50%',
        left: '50%',
        scale: 0.8,
        width: window.innerWidth,
        height: window.innerHeight,
        transform: 'translate(-50%,-70%)',
        dragging: false,
    },

    caption: {
        isVisible: true,
        height: 100,
    },
    comment: {
        isVisible: true,
    },
    preload: {
        pixivJson: basicResponse,
        commentJson: commentResponse,
        ugoiraJson: ugoiraResponse,
        artworktype: artworkType.illust,
        illustData: illustData,
        mangaData: mangaData,
    },
    pixivJson: basicResponse,
    commentJson: commentResponse,
    ugoiraJson: ugoiraResponse,
    artworktype: artworkType.illust,
    illustData: illustData,
    mangaData: mangaData,

};

const actions = {};
const getters = {};

const mutations = {
        async setIllustID(state, id) {
            state.illustID = id;

            state.preload.pixivJson = await fetch(`https://www.pixiv.net/ajax/illust/${id}`,
                {
                    method: 'GET',
                    mode: 'cors',
                    keepalive: true,
                },
            ).then(function (response) {
                if (response.ok) {
                    return response.json();
                }
            }).then(json => {
                return new PixivJson(json);
            });

            if (state.comment.isVisible) {
                const url = `https://www.pixiv.net/ajax/illusts/comments/roots?illust_id=${id}&offset=${0}&limit=${100}`
                state.preload.commentJson = await fetch(url,
                    {
                        method: 'GET',
                        mode: 'cors',
                        keepalive: true
                    }).then(function (response) {
                    if (response.ok) {
                        return response.json();
                    }
                }).then((json) => {
                    return new PixivJson(json);
                })
            }
            ;

            if (state.isUgoira) {
                const url = `https://www.pixiv.net/ajax/illust/${id}/ugoira_meta`
                state.preload.ugoiraJson = await fetch(url,
                    {
                        method: 'GET',
                        mode: 'cors',
                        keepalive: true
                    }).then(function (response) {
                    if (response.ok) {
                        return response.json();
                    }
                }).then((json) => {
                    return new PixivJson(json);
                })
            }
        },


        setScreen(state, elem) {
            state.screen.elem = elem;
        }
        ,
        screenTop() {
            return state.screen.top
        }
        ,
        screenHeight(state, sHeight) {
            state.screen.height = sHeight;
        },
        screenWidth(state, sWidth) {
            state.screen.width = Math.floor(sWidth);
        },
        captionHeight(state, height) {
            state.caption.height = height;
        },
        screenLoaded(state) {
            state.screen.isLoaded = true;
        },
        isUgoira(state, bool) {
            state.isUgoira = bool;
        },
        fetchScreen(state) {
            state.pixivJson = JSON.parse(JSON.stringify(state.preload.pixivJson));
            state.commentJson = JSON.parse(JSON.stringify(state.preload.commentJson));
            state.ugoiraJson = JSON.parse(JSON.stringify(state.preload.ugoiraJson));
            state.artworktype = state.preload.artworktype;
            state.screen.isVisible = true;
            state.screen.left = '50%';
            state.screen.top = '50%';
        }
        ,
        showScreen(state) {

            state.screen.isVisible = true;
            state.screen.left = '50%';
            state.screen.top = '50%';

        }
        ,
        hide(state) {
            state.screen.isVisible = false;
            state.screen.isLoaded = false;
        }
        ,
        setIllustPageBool(state, value) {
            state.enable.modifyIllustPage = value;
        },
        setAutherPageBool(state, value) {
            state.enable.modifyAutherPage = value;
        },
        setPopupBool(state, value) {
            state.enable.pupupScreen = value;
        },
        setPopupScale(state, value) {
            state.screen.scale = value;
        },
        toggleCaption(state){
          state.caption.isVisible = !state.caption.isVisible
        },
    toggleComment(state){
        state.comment.isVisible = !state.comment.isVisible
    }
    }
;

export const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
});

class PixivJson {
    constructor(json) {
        Object.assign(this, json);
    }
}

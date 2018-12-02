<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper " @click.self="$emit('close')">
                <div class="modal-container">
                    <div class="modal-header">
                        <h1>Pixiv View Util</h1>
                    </div>
                    <div class="modal-body">


                        <label class="control control-checkbox">
                            Modify the illust page's layout
                            <input type="checkbox" v-model="changeIllustPage"/>
                            <div class="control_indicator"></div>
                        </label>


                        <label class="control control-checkbox">
                            Modify the auhor page's layout
                            <input type="checkbox" v-model="changeAutherPage"/>
                            <div class="control_indicator"></div>
                        </label>

                        <label class="control control-checkbox">
                            Use popup function
                            <input type="checkbox" v-model="enablePopup"/>
                            <div class="control_indicator"></div>
                        </label>

                        <h2>Popup size (min <-> max)</h2>
                        <input type="range" v-model="setSize" min="0.3" max="1.2" step="0.1" id="pixiv-set-scale"/>

                        <div class="modal-footer">
                            <button class="myButton"
                                    @click="$emit('close')">
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'Modal',
        data() {
            return {}
        },
        computed: {
            changeIllustPage: {
                get() {
                    return this.$store.state.enable.modifyIllustPage
                },
                set(value) {
                    this.$store.commit('setIllustPageBool', value)
                }
            },
            changeAutherPage: {
                get() {
                    return this.$store.state.enable.modifyAutherPage
                },
                set(value) {
                    this.$store.commit('setAutherPageBool', value)
                }
            },
            enablePopup: {
                get() {
                    return this.$store.state.enable.pupupScreen
                },
                set(value) {
                    this.$store.commit('setPopupBool', value)
                }
            },
            setSize:{
                get() {
                    return this.$store.state.screen.scale
                },
                set(value) {
                    this.$store.commit('setPopupScale', value)
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 300px;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header h3 {
        margin-top: 0;
        color: #42b983;
    }

    .modal-body {
        margin: 20px 0;
    }

    .modal-default-button {
        float: right;
    }

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }

    .myButton {
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0.05, #7892c2), color-stop(1, #476e9e));
        background: -moz-linear-gradient(top, #7892c2 5%, #476e9e 100%);
        background: -webkit-linear-gradient(top, #7892c2 5%, #476e9e 100%);
        background: -o-linear-gradient(top, #7892c2 5%, #476e9e 100%);
        background: -ms-linear-gradient(top, #7892c2 5%, #476e9e 100%);
        background: linear-gradient(to bottom, #7892c2 5%, #476e9e 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#7892c2', endColorstr='#476e9e', GradientType=0);
        background-color: #7892c2;
        -moz-border-radius: 6px;
        -webkit-border-radius: 6px;
        border-radius: 6px;
        border: 1px solid #4e6096;
        display: inline-block;
        cursor: pointer;
        color: #ffffff;
        font-family: Arial;
        font-size: 16px;
        padding: 10px 20px;
        text-decoration: none;
    }

    .myButton:hover {
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0.05, #476e9e), color-stop(1, #7892c2));
        background: -moz-linear-gradient(top, #476e9e 5%, #7892c2 100%);
        background: -webkit-linear-gradient(top, #476e9e 5%, #7892c2 100%);
        background: -o-linear-gradient(top, #476e9e 5%, #7892c2 100%);
        background: -ms-linear-gradient(top, #476e9e 5%, #7892c2 100%);
        background: linear-gradient(to bottom, #476e9e 5%, #7892c2 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#476e9e', endColorstr='#7892c2', GradientType=0);
        background-color: #476e9e;
    }

    .myButton:active {
        position: relative;
        top: 1px;
    }

    input[type=range] {
        height: 25px;
        -webkit-appearance: none;
        margin: 10px 0;
        width: 100%;
    }

    input[type=range]:focus {
        outline: none;
    }

    input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 5px;
        cursor: pointer;
        animate: 0.2s;
        box-shadow: 0px 0px 0px #000000;
        background: #C3D7E3;
        border-radius: 1px;
        border: 0px solid #000000;
    }

    input[type=range]::-webkit-slider-thumb {
        box-shadow: 0px 0px 0px #000000;
        border: 1px solid #4e6096;
        height: 18px;
        width: 18px;
        border-radius: 25px;
        background: #597bab;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -7px;
    }

    input[type=range]:focus::-webkit-slider-runnable-track {
        background: #C3D7E3;
    }

    input[type=range]::-moz-range-track {
        width: 100%;
        height: 5px;
        cursor: pointer;
        animate: 0.2s;
        box-shadow: 0px 0px 0px #000000;
        background: #C3D7E3;
        border-radius: 1px;
        border: 0px solid #000000;
    }

    input[type=range]::-moz-range-thumb {
        box-shadow: 0px 0px 0px #000000;
        border: 1px solid #2497E3;
        height: 18px;
        width: 18px;
        border-radius: 25px;
        background: #5C82FF;
        cursor: pointer;
    }

    input[type=range]::-ms-track {
        width: 100%;
        height: 5px;
        cursor: pointer;
        animate: 0.2s;
        background: transparent;
        border-color: transparent;
        color: transparent;
    }

    input[type=range]::-ms-fill-lower {
        background: #C3D7E3;
        border: 0px solid #000000;
        border-radius: 2px;
        box-shadow: 0px 0px 0px #000000;
    }

    input[type=range]::-ms-fill-upper {
        background: #C3D7E3;
        border: 0px solid #000000;
        border-radius: 2px;
        box-shadow: 0px 0px 0px #000000;
    }

    input[type=range]::-ms-thumb {
        margin-top: 1px;
        box-shadow: 0px 0px 0px #000000;
        border: 1px solid #2497E3;
        height: 18px;
        width: 18px;
        border-radius: 25px;
        background: #5C82FF;
        cursor: pointer;
    }

    input[type=range]:focus::-ms-fill-lower {
        background: #C3D7E3;
    }

    input[type=range]:focus::-ms-fill-upper {
        background: #C3D7E3;
    }

    .control {
        font-family: arial;
        display: block;
        position: relative;
        padding-left: 30px;
        margin-bottom: 5px;
        padding-top: 2px;
        cursor: pointer;
        font-size: 14px;
    }

    .control input {
        position: absolute;
        z-index: -1;
        opacity: 0;
    }

    .control_indicator {
        position: absolute;
        top: 2px;
        left: 0;
        height: 20px;
        width: 20px;
        background: #e6e6e6;
        border: 0px solid #000000;
    }

    .control-radio .control_indicator {
        border-radius: undefined%;
    }

    .control:hover input ~ .control_indicator,
    .control input:focus ~ .control_indicator {
        background: #cccccc;
    }

    .control input:checked ~ .control_indicator {
        background: #597caf;
    }

    .control:hover input:not([disabled]):checked ~ .control_indicator,
    .control input:checked:focus ~ .control_indicator {
        background: #0e6647d;
    }

    .control input:disabled ~ .control_indicator {
        background: #e6e6e6;
        opacity: 0.6;
        pointer-events: none;
    }

    .control_indicator:after {
        box-sizing: unset;
        content: '';
        position: absolute;
        display: none;
    }

    .control input:checked ~ .control_indicator:after {
        display: block;
    }

    .control-checkbox .control_indicator:after {
        left: 8px;
        top: 4px;
        width: 3px;
        height: 8px;
        border: solid #ffffff;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }

    .control-checkbox input:disabled ~ .control_indicator:after {
        border-color: #7b7b7b;
    }
</style>

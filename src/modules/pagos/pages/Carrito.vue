<template lang="">
    <div class="carrito">
        <h2>Resumen de compra</h2>
        <div class="carrito-grid">
            <h2>Subtotal</h2>
            <h3>{{planes[$route.params.plan-1].precio}}</h3>

            <h2>IVA</h2>
            <h3>{{planes[$route.params.plan-1].precio*0.13}}</h3>
            
            <h2>Precio Final</h2>
            <h3>{{planes[$route.params.plan-1].precio+planes[$route.params.plan-1].precio*0.13}}</h3>

        </div>
        <div id="pp-button-container"></div>
    </div>
</template>

<script>
import axios from "axios";
import { ref, toRaw } from 'vue'

import jsonData from "@/modules/pagos/helpers/planes.json"
import cedulaServiceInstance from "@/modules/utils/tokenUtils"
export default {
    data() {
        return {
            algo: 10,
            planes: jsonData,
            precio: null,
            appId: "4zNC2K4akUCw6ta2oFJ6g",
            token: "moZXbXlCPgo5VhaoTdx3MEMoJ2tWopWsAGIxPSpWDwvC-VflrgHR5f642UPVEZt-DYONxE1NWzvhjxH1vuuUf4cO8ZrEzb8FkB0YmPiSHQHq-rvkFXv_12_8xPAetHD48yJh4gRiGMuvvXWijnrv9hUE_wr7rqT1v1SYYOcStbdAblhokAfOMtYakmE8rfLE8DsvF-h-wIf-QFacHqRca4Iaou1ignVqNJz8HA1Yb6GIhuKVdJZpjrGdhbcFyyGoE58Ewbo79swhrCgMb4zfvkY_5WuMkdY5lmPhcfOouwAJMZ7U74wbH_FSS28R8xfmvEpuD4xtgptKvYFMEXEQyucXkGE"
            , transactionData: {
                amount: 100,
                amountWithoutTax: 100,
                currency: 'USD',
                clientTransactionId: 'unique_identifier', // Replace with a unique identifier for your transaction
                lang: 'es' // Language (optional)
            }
        }
    },
    mounted() {

        this.initPayphoneButton();

    },
    methods: {
        async initPayphoneButton() {
            try {
                // Load the Payphone script dynamically (recommended for security)
                const script = document.createElement('script');
                script.src = `https://pay.payphonetodoesposible.com/api/button/js?appId=${this.appId}`;
                document.body.appendChild(script);

                // Wait for script to load before initializing (optional, can be improved with Promise handling)
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Initialize Payphone Button with configuration and error handling
                window.payphone.Button({
                    token: this.token,
                    btnHorizontal: true,
                    btnCard: true,
                    createOrder: async function (actions) {
                        return actions.prepare({
                            amount: 100,
                            amountWithoutTax: 100,
                            currency: "USD",
                            clientTransactionId: "identificador-único",
                            lang: "es"
                        }).then(function (paramlog) {
                            console.log("bien")
                            console.log(paramlog);
                            return paramlog;
                        }).catch(function (paramlog2) {
                            console.log("proceso cancelado")
                            console.log(paramlog2);
                            return paramlog2;
                        });
                    },

                    onComplete: function (model, actions) {
                        console.log('Payment complete:', model);
                        // Handle successful payment completion (e.g., update order status, display confirmation message)
                    },
                    onabort: function () {

                    }
                }).render('#pp-button-container');
            } catch (error) {
                console.error('Error initializing Payphone Button:', error);
            }
        },

    },

}
</script>

<style>
.carrito {
    display: flex;
    flex-direction: column;
    justify-content: center;

}
</style>
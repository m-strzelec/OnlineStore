<template>
    <div class="container mt-5">
        <h1>Shopping Cart</h1>
        <div class="my-4">
            <table class="table table-striped table-bordered table-hover">
                <thead class="table-dark">
                    <tr>
                        <th scope="row">#</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody class="align-middle">
                    <tr v-for="(item, index) in products" :key="item.productId">
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.productName }}</td>
                        <td>
                            <button @click="decrementQuantity(index)" :disabled="item.quantity <= 1"
                                class="btn btn-outline-secondary btn-sm">-</button>
                            {{ item.quantity }}
                            <button @click="incrementQuantity(index)" class="btn btn-outline-secondary btn-sm">+</button>
                        </td>
                        <td>{{ (item.price * item.quantity).toFixed(2) }} zł</td>
                        <td>
                            <button @click="removeItem(index)" class="btn btn-danger">Remove</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Total Price: {{ totalPrice }} zł</h3>
        <OrderForm :username="username" :email="email" :phone="phone" @submitOrder="submitOrder" />
        <router-link to="/product-list" class="btn btn-outline-info mt-3">Back to Product List</router-link>
    </div>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';
import OrderForm from './OrderForm.vue';

export default {
    name: 'ShoppingCart',
    setup() {
        const toast = useToast();
        return {
            toast,
        };
    },
    data() {
        return {
            username: '',
            email: '',
            phone: '',
        };
    },
    components: {
        OrderForm,
    },
    methods: {
        incrementQuantity(index) {
            this.products[index].quantity++;
        },
        decrementQuantity(index) {
            if (this.products[index].quantity > 1) {
                this.products[index].quantity--;
            }
        },
        removeItem(index) {
            this.products.splice(index, 1);
        },
        submitOrder(formData) {
            this.username = formData.username.trim();
            this.email = formData.email.trim();
            this.phone = formData.phone.trim();

            if (this.products.length === 0) {
                this.toast.warning('Please add products to your cart before submitting the order.');
                return;
            }
            if (!this.username || !this.email || !this.phone) {
                this.toast.warning('Please fill in all the required fields in the form.');
                return;
            }

            const body = {
                userName: this.username,
                email: this.email,
                phoneNumber: this.phone,
                orderedProducts: this.products.map(item => ({
                    product: item.productId,
                    quantity: item.quantity,
                })),
            };
            axios.post(`http://localhost:3000/orders`, body)
                .then(response => {
                    console.log('Order submitted successfully:', response.data);
                    this.$router.push('product-list');
                    this.toast.success('Order submitted successfully!');
                    this.$store.commit('clearProducts');

                })
                .catch(error => {
                    this.toast.error('Error while submitting the order');
                    console.error('Error while submitting the order:', error);
                });
        },
    },
    computed: {
        products() {
            return this.$store.state.products;
        },
        totalPrice() {
            return this.products.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
        },
    },
};
</script>

<style scoped></style>

<template>
    <tr>
        <td>{{ index }}</td>
        <td>{{ order._id }}</td>
        <td>{{ order.userName }}</td>
        <td>{{ order.email }}</td>
        <td>{{ order.phoneNumber }}</td>
        <td>{{ status }}</td>
        <td>
            <div class="d-inline-flex">
                <button @click="changeOrderStatus('CANCELLED')" class="btn btn-danger me-2">CANCELLED</button>
                <button v-if="order.orderStatus !== approved._id" @click="changeOrderStatus('APPROVED')" 
                    class="btn btn-info">APPROVED</button>
                <button v-if="order.orderStatus === approved._id" @click="changeOrderStatus('COMPLETED')"
                    class="btn btn-success">COMPLETED</button>
                {{ console.log(approved._id) }}
            </div>
        </td>
    </tr>
</template>

<script>
export default {
    name: 'AdminOrderItem',
    props: {
        order: Object,
        index: Number,
        status: String,
        approved: Object,
    },
    methods: {
        changeOrderStatus(action) {
            this.$emit('change-status', this.order._id, action);
        },
    },
};
</script>
    
<style scoped></style>
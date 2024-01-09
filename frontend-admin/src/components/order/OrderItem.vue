<template>
    <tr>
        <td>{{ index }}</td>
        <td>{{ order._id }}</td>
        <td>{{ order.userName }}</td>
        <td>{{ order.email }}</td>
        <td>{{ order.phoneNumber }}</td>
        <td>{{ order.approvalDate }}</td>
        <td>
            <button @click="changeOrderStatus('CANCELLED')" class="btn btn-danger me-2">CANCELLED</button>
            <button @click="changeOrderStatus('APPROVED')" class="btn btn-success">APPROVED</button>
        </td>
    </tr>
</template>

<script>
export default {
    name: 'OrderItem',
    props: {
        order: Object,
        index: Number,
        status: String,
    },
    methods: {
    changeOrderStatus(action) {
        this.$emit('change-status', this.order._id, action);
    },

    },
};
</script>
    
<style scoped></style>
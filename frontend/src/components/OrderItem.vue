<template>
    <tr>
        <td>{{ index }}</td>
        <td>{{ order._id }}</td>
        <td>{{ order.userName }}</td>
        <td>{{ order.email }}</td>
        <td>{{ order.phoneNumber }}</td>
        <td>{{ order.approvalDate }}</td>
        <td>{{ status }}</td>
    </tr>
</template>

<script>
export default {
    props: {
        order: Object,
        index: Number,
        status: String,
    },
    methods: {

    },
};
</script>
    
<style scoped></style>
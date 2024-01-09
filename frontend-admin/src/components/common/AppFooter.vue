<template>
    <div class="d-flex flex-column min-vh-100">
        <footer class="footer bg-dark text-white mt-auto pt-3">
            <div class="container text-center">
                <p>&copy; {{ new Date().getFullYear() }} Marcin Strzelec &amp; Bartosz Wiśniewski</p>
            </div>
        </footer>
    </div>
</template>
  
<script>
export default {
    name: 'AppFooter'
};
</script>
  
<style scoped></style>
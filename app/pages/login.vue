<template>
    <div class="w-screen h-screen bg-blue-500">
        <div class="flex justify-center items-center w-full h-full">
            <div class="border-2 border-blue-800 rounded-md px-10 py-5 hover:bg-blue-300 bg-blue-200">
                <div class="flex justify-center mb-2 font-bold text-2xl">
                    <label for="">Login</label>
                </div>
                <div class="mb-2">
                    <input type="text" name="" id="" class="border-2 rounded-md border-black focus:outline-none focus:border-blue-300 px-2 py-1" placeholder="username">
                </div>
                <div class="mb-2">
                    <input type="password" name="" id="" class="border-2 rounded-md border-black focus:outline-none focus:border-blue-300 px-2 py-1" placeholder="password">
                </div>
                <div>
                    <input type="button" value="เข้าสู่ระบบ" class="border-2 border-black rounded-md py-2 w-full bg-blue-500 text-white hover:bg-blue-700">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const login = (username, password) => ( async() =>{
    const res = await axios.post("ip:port/api/login",{
        user: username,
        password: password,
    })
})
</script>

<style lang="scss" scoped>

</style>
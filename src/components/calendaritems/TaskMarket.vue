<template>
    <div class="flex space-x-2 mx-4">
        <div class="w-3/4 bg-cyans rounded-lg px-2.5">
            <h1 class="text-xl font-bold font-fredoka text-left text-cyanp my-1">Assignments</h1>
        </div>
        <div class="w-1/4 px-2.5">
            <h1 class="text-xl font-bold font-fredoka text-left text-cyanp my-1">Task Market</h1>
            <div class="task">
                <div class="w-4/5">
                    <p class="text-cyanp font-bold">sweep living room</p>
                    <p>created on: 08:05 AM</p>
                    <p class="text-orangep">automatically assigned in 6hrs</p>
                </div>
                <div class="w-1/5 text-center h-5">
                    <div class="bg-cyanp font-fredoka font-bold text-2xl rounded-lg align-middle">
                        <p class="text-cyans">20</p>
                    </div>
                    <p>points</p>
                </div>
            </div>
            <button>hi</button>
        </div>
    </div>
</template>

<script>
    import '@/assets/main.css';

    export default {
        components: {
        },
    };
</script>

<style>
.task {
    display: flex;
    background-color: white;
    border-radius: 8px;
    margin: 10px 0;
    padding: 10px;
}
</style>
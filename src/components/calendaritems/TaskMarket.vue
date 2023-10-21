<template>
    <div class="flex space-x-2 mx-4">
        <div class="w-3/4 bg-cyans rounded-lg px-2.5">
            <h1 class="text-xl font-bold font-fredoka text-left text-cyanp my-1">Assignments</h1>
            <h2>{{ formattedDate }}</h2>

            <table>
            <tr class="text-center">
                <th v-for="(day, index) in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']" :key="index">{{ day }}</th>
            </tr>
            <tr v-for="(week, weekIndex) in Math.ceil((daysInMonth + firstDayOfWeek) / 7)">
                <td v-for="dayIndex in 7" :key="dayIndex">
                <span v-if="dayIndex + (weekIndex * 7) >= firstDayOfWeek + 1 && dayIndex + (weekIndex * 7) <= daysInMonth + firstDayOfWeek">
                    {{ dayIndex + (weekIndex * 7) - firstDayOfWeek }}
                </span>
                </td>
            </tr>
            </table>

        </div>
        <div class="w-1/4 px-2.5">
            <h1 class="text-xl font-bold font-fredoka text-left text-cyanp my-1">Task Market</h1>
            <div class="task">
                <div class="task-detail">
                    <div class="w-4/5">
                        <p class="text-cyanp font-bold">sweep living room</p>
                        <p>created on: 08:05 AM</p>
                        <p class="text-orangep">automatically assigned in 6hrs</p>
                    </div>
                    <div class="w-1/5 text-center">
                        <div class="bg-cyanp font-fredoka font-bold text-2xl rounded-lg">
                            <p class="text-cyans">20</p>
                        </div>
                        <p>points</p>
                    </div>
                </div>
                <div class="flex justify-center items-center">
                    <button class="px-4 py-2 text-black bg-oranges rounded hover:bg-orangep focus:outline-none focus:ring focus:ring-oranges">
                        <svg class="text-black h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002"/>
                        </svg>
                        i'll do it!
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import '@/assets/main.css';

    export default {
        components: {
        },
        data () {
            const currentDate = new Date(2023, 9); // October 2023 (0-indexed month)
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const daysInMonth = lastDay.getDate();
            const firstDayOfWeek = firstDay.getDay(); // 0 (Sunday) to 6 (Saturday)

            return {
                year,
                month,
                daysInMonth,
                firstDayOfWeek: firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1, // Adjust for Monday as the start of the week (0 => 6, 1 => 0, ..., 6 => 5)
            };
        },
        computed: {
        formattedDate() {
            const options = { year: 'numeric', month: 'long' };
            return new Date(this.year, this.month).toLocaleString(undefined, options);
        },
},

    };
</script>

<style>
table {
    border: solid #2EC4B6 2px;
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed; /* Use fixed table layout */

    /* Adjust column widths evenly */
}

th, td {
    border: solid #2EC4B6 2px;
    text-align: center; /* Center-align content */
    padding: 8px; /* Adjust cell padding as needed */
}

th {
    font-family: 'Fredoka One', sans-serif;
    font-size: 20px;
    background-color: #2EC4B6; /* Add background color for header */
    color: white; /* Add text color for header */
}

tr:nth-child(1):td {
    border-top-left-radius: 100px;
    border-top-right-radius: 100px;
}

tr:last-child td {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

/* Apply rounded corners to the first and last columns */
tr td:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

tr td:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}
</style>

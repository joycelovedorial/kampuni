<template>
    <Navbar />
    <h1>Welcome back, {{ firstName }}</h1>
    <Dashboard />
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { db, auth } from '@/firebase/config';
import Navbar from '@/components/Navbar.vue';
import Dashboard from '@/components/Dashboard.vue';
import { doc, getDoc } from 'firebase/firestore';

export default {
    components: {
        Navbar,
        Dashboard
    },
    setup() {
        const router = useRouter();
        const firstName = ref('');

        // Get the user's ID from Firebase auth
        const user = auth.currentUser;
        const uid = user ? user.uid : null;

        // Fetch the user's data from Firestore
        const fetchUserData = async () => {
            if (uid) {
                const userDocRef = doc(db, 'users', uid);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    if (userData) {
                        // Extract the first name from the user's data
                        firstName.value = userData.firstName;
                    }
                }
            }
        };

        onMounted(() => {
            if (!uid) {
                router.push({ name: 'Welcome' });
            } else {
                fetchUserData();
            }
        });

        return {
            firstName
        };
    }
};
</script>

<style>
h1 {
    margin: 0 auto;
    text-align: center;
}
</style>
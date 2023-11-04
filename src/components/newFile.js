import { formatDistanceToNow } from 'date-fns';
import { computed, onUpdated, ref, watch } from 'vue';
import { collection, query, orderBy, onSnapshot, doc, getDoc, where, getDocs } from "firebase/firestore";
import { db, auth } from '@/firebase/config';

export default (await import('vue')).defineComponent({
components: { Chatform, createExpense },
props: {
selectedchat: String,
name: String,
},
setup(props, context) {
// Query a reference to a subcollection
console.log("Chatwindow setup");
const selectedchat = ref(props.selectedchat);
const messages = ref(null);
const documents = ref([]);
const error = ref(null);
const name = ref(props.name);
const thisName = ref("");
const outid = ref("");
const expensesArray = ref([]);
const displayCreateExpense = ref(false);

const fetchName = async () => {
const user = auth.currentUser;
const uid = user.uid;
const docRef = doc(db, "users", uid);
const docSnap = await getDoc(docRef);
const docData = docSnap.data();
thisName.value = docData.firstname;
};
fetchName();

console.log("setup", props.name);
getDoc(doc(db, "chatrooms", props.selectedchat))
.then((docSnap) => {
const data = docSnap.data();
if (data.outing) {
outid.value = data.outing;
const qExpenses = query(collection(db, "expenses"), where("outing", "==", outid.value));
expensesArray.value = [];
const qExSnap = getDocs(qExpenses).then((querySnap) => {
querySnap.forEach((doc) => {
expensesArray.value.push({ ...doc.data(), id: doc.id });
console.log("expenses arrya", expensesArray.value);

});
});
} else {
outid.value = null;
expensesArray.value = [];
console.log("no outing");
}
});
const q = query(collection(db, "chatrooms", props.selectedchat, "messages"), orderBy("createdAt"));
let unsubscribe = onSnapshot(q, (snapshot) => {
console.log("unsub", props.selectedchat);
let results = [];
snapshot.docs.forEach(doc => {
doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
});
documents.value = results;
error.value = null;
}, (err) => {
console.log(err.message);
documents.value = null;
error.value = 'could not fetch the data';
});


const formattedDocuments = computed(() => {
if (documents.value) {
return documents.value.map(doc => {
let time = formatDistanceToNow(doc.createdAt.toDate());
return { ...doc, createdAt: time };
});
} else {
return [];
}
});
console.log(formattedDocuments);
console.log(typeof (formattedDocuments));

watch(() => props.selectedchat, (newChatRoom, oldChatRoom) => {
console.log("chatwindow watch");

if (oldChatRoom) {
// Unsubscribe from the previous listener (if it exists)
unsubscribe();

}

if (newChatRoom) {
// Create a new query for the new chat room and start a new listener
getDoc(doc(db, "chatrooms", newChatRoom))
.then((docSnap) => {
const data = docSnap.data();
if (data.outing) {
outid.value = data.outing;
const qExpenses = query(collection(db, "expenses"), where("outing", "==", outid.value));
expensesArray.value = [];
const qExSnap = getDocs(qExpenses).then((querySnap) => {
querySnap.forEach((doc) => {
expensesArray.value.push({ ...doc.data(), id: doc.id });
console.log("expenses arrya", expensesArray.value);
});
});
} else {
outid.value = null;
expensesArray.value = [];
console.log("no outng");
}

});

const q = query(collection(db, "chatrooms", newChatRoom, "messages"), orderBy("createdAt"));
unsubscribe = onSnapshot(q, (snapshot) => {
// Handle updates for the new chat room
let results = [];
snapshot.docs.forEach((doc) => {
doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
});
documents.value = results;
error.value = null;
}, (err) => {
console.log(err.message);
documents.value = null;
error.value = "Could not fetch the data";
});
}
selectedchat.value = props.selectedchat;
name.value = props.name;
console.log("check for name", name.value);
console.log("watchcehck", selectedchat.value);
});


onUpdated(() => {
if (messages.value) {
messages.value.scrollTop = messages.value.scrollHeight;
}
});

return { documents, formattedDocuments, selectedchat, messages, name, thisName, outid, expensesArray, displayCreateExpense, };

},
documents, : .getElementByClass('click-expenses').addEventListener('click', function () { this.classList.toggle('clicked'); })
});

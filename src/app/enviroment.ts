export const FIREBASE_CONFIG = {
    // apiKey: "AIzaSyAtusvycQ_0U-7QZZOPscev4uFIzXtXkUc",
    // authDomain: "appbandienthoaididongxachtay.firebaseapp.com",
    // databaseURL: "https://appbandienthoaididongxachtay.firebaseio.com",
    // projectId: "appbandienthoaididongxachtay",
    // storageBucket: "appbandienthoaididongxachtay.appspot.com",
    // messagingSenderId: "180544130486"
    apiKey: "AIzaSyDVZv2Sdneux9PCMeUIll7GCLDiQJbUwKE",
    authDomain: "databaseappbandienthoai.firebaseapp.com",
    databaseURL: "https://databaseappbandienthoai.firebaseio.com",
    projectId: "databaseappbandienthoai",
    storageBucket: "databaseappbandienthoai.appspot.com",
    messagingSenderId: "803391004382"
};
export const snapshotToArray = snapshot=>{
    let returnArray=[];
    snapshot.forEach(element => {
        let item =element.val();
        item.key=element.key;
        returnArray.push(item);
    });
    return returnArray;
}
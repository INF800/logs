const logsContainer = document.getElementById('logs-container')
const pw1           = document.getElementById('pw1')

// Load IndexedDB
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.tx = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
 
if (!window.indexedDB) {
   window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

// Operations

function operation(type, dataList=null, delItemId=null){
    const dbName    = "LOGS";
    var request     = indexedDB.open(dbName, 3), db, tx, store, index; // globals
    
    // doesn't execute while retreiving data
    request.onupgradeneeded = function(e) {
        let db = request.result,
        store = db.createObjectStore('logStore',  {keyPath: 'date'} ),
        index = store.createIndex('date', 'date', {unique: true}); /* ('logStore', {autoIncrement: true}) or {keyPath: 'id'} */
    };
    
    request.onerror = function(e) {
        console.log("ERROR: ", e.target.errorCode)
    };
    
    request.onsuccess = function(e) {
        db          = request.result;
        tx          = db.transaction('logStore', 'readwrite');
        store       = tx.objectStore('logStore');
        dateIndex   = store.index('date')

        //store.delete('2020-07-02T18:04:41.551Z')
    
        db.onerror = function(e){
            console.log("DB ERROR: ", e.target.errorCode)
        }
    
        if (type=='putData'){
            _putData(dataList);
        } else if (type == 'getData'){
            _getData();
        } else if (type == 'getAll'){
            _getAll()
        } else if (type == 'delData') {
            _delData(delItemId)
        }
    
        tx.oncomplete = function(){
            db.close()
        }
    }
    
    function _putData(dataList){
        for (let i=0; i<dataList.length; i++){
            store.put({
                date    : dataList[i].date,
                head    : dataList[i].head,
                log     : dataList[i].log
            });
        }
    }
    
    function _getData(){
        // get data
        let atId1   = store.get(1); // key i.e id = 1
        let atDateIdx   = dateIndex.get('101 Mar 2020 - 7pm');
    
        // as asynchronous, use
        atId1.onsuccess = function(){
            console.log(atId1.result);
            console.log(atId1.result.head, atId1.result.log);
        };
        
        atDateIdx.onsuccess = function(){
            console.log(atDateIdx.result);
            console.log(atDateIdx.result.head, atId1.result.log);
        };
    }

    function _getAll() {
        var allRecords = store.getAll();

        allRecords.onsuccess = function() {

            console.log('ALL YOUR DATA :\n',allRecords.result)
            
            entries = allRecords.result;
            
            for(let i=0; i<entries.length; i++){
                
                // print skipped aswell
                console.log(entries[i])
                
                // skip encrypted trick
                // there will be
                if (!decryptData(entries[i].log, pw1.value)){
                    alert('Wrong Password! or Multiple passwords may exist')
                    continue
                }
                // end trick
                
                
                // Create html node and append
                var hCard = document.createElement("div");
                hCard.classList.add("h-card");

                var hCardHead = document.createElement("div");
                hCardHead.classList.add("h-card-head");
                //var _date = new Date(entries[i].date)
                hCardHead.innerHTML = entries[i].date + '<br>' + entries[i].head

                var hCardLog = document.createElement("div");
                hCardLog.classList.add("h-card-log");
                hCardLog.innerHTML = decryptData(entries[i].log, pw1.value)

                hCard.appendChild(hCardHead)
                hCard.appendChild(hCardLog)
                logsContainer.appendChild(hCard)


            }
        };
    }

    function _delData(delItemId) {
        console.log('deleting', delItemId) 
        store.delete(delItemId)

    }
}

// MAIN
// comment one of four
// ------------------
dataList = [{
    date        : '100 Mar 2020 - 6pm',
    head        : 'head1 New',
    log         : 'log1 ...'
},{
    date        : '101 Mar 2020 - 7pm',
    head        : 'head2',
    log         : 'log2 ...'
}];

// 1.
//operation(type="putData", dataList=dataList)

// 2. After put data / if existing db
//operation(type="getData")

//3. getAll

//4. delData
// operation(type="delData", dataList=null, delItemId='Thu Jul 02 2020 21:12:32 GMT+0530 (India Standard Time)')
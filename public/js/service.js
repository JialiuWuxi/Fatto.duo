if (typeof law === 'undefined') window.law = {};

window.law.getListItems = async function (element, recourseOption, callback) {
    const SelectValue = $(element).val();
    const accessToken = document.cookie.replace(/(?:(?:^|.*;\s*)graph_access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    let config = { headers: { Authorization: accessToken, } }
    try {
        if( recourseOption === 1 ) {//get department list filter by branchid
            var response = await axios.get(`http://localhost:4000/api/v2/departments?branchid='${SelectValue}'`, config);
        }else if( recourseOption === 2 ){
            var response = await axios.get(`http://localhost:4000/api/v2/employees?departmentid='${SelectValue}'`, config);
        }else if( recourseOption === 3 ){
            var response = await axios.get(`http://localhost:4000/api/v2/clients`, config);
        }else if( recourseOption === 4 ){ //get group members filter by group name
            var response = await axios.get(`http://localhost:4000/api/v2/groups?search=${encodeURIComponent(SelectValue)}`, config);
        }else{
            throw 'Option error';
        }
        callback(response.data.value);
    } catch (error) {
        console.log(error);
    }
};

window.law.postListItems = async function (data, APIOption) {
    const accessToken = document.cookie.replace(/(?:(?:^|.*;\s*)graph_access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    let config = { headers: { Authorization: accessToken, } }
    try {
        if(APIOption === 1){
            await axios.post(`http://localhost:4000/api/v2/clients`, data, config);
        }else if(APIOption === 2){
            await axios.post(`http://localhost:4000/api/v2/matters`, data, config);
        }else if( APIOption === 3 ){
            await axios.post(`http://localhost:4000/api/v2/groups`, data, config);
        }else if( APIOption === 4 ){
            await axios.post(`http://localhost:4000/api/v2/guests`, data, config);
        }else{
            throw 'Option error'
        }
    } catch ( error ) {
        console.log(error);
    }
};

window.law.addGuesttoGroup = async function ( clientName, contactData ) {
    const accessToken = document.cookie.replace(/(?:(?:^|.*;\s*)graph_access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    let config = { headers: { Authorization: accessToken, } }
    try{
        //get group id filter by name
        var groupID = await axios.get(`http://localhost:4000/api/v2/groups?orderby=${encodeURIComponent(clientName)}`, config);
        var userID = await axios.get(`http://localhost:4000/api/v2/users?userName=${contactData.guestDisplayName}`, config);
        let postBody = {"@odata.id": `https://graph.microsoft.com/v1.0/directoryObjects/${userID.data}`}
        await axios.post(`http://localhost:4000/api/v2/groups?addMember=${groupID.data}`, postBody, config)
    }catch(err){
        console.log(err);
    }
};

window.law.addPeople = function (elementValue, elementName, displayName) {
    const SelValue = $(elementValue).val();
    let resultHtml = '';
    resultHtml = `<li class="list-group-item">${displayName}</li>
                  <li class="list-group-item">${SelValue}</li>
                  <input type='hidden' name='${elementName}' value=${SelValue}> `;
    $(`#${elementName}_list`).html(resultHtml);
    $(`#${elementName}-delete`).show();
    $(`#${elementName}-add`).hide();
}

window.law.delPeople = function(elementName, displayName) {
    let resultHtml = '';
    resultHtml = `<li class="list-group-item">${displayName}</li>
                  <li class="list-group-item">Empty</li>
                  <input type='hidden' name='${elementName}' value="">`;
    $(`#${elementName}_list`).html(resultHtml);
    $(`#${elementName}-add`).show();
    $(`#${elementName}-delete`).hide();
}


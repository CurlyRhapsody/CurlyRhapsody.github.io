var Characters = [];
var Amounts = [];

var CurrentRow = -1;

var CharTable = document.getElementById('CharTable');
var CharTableCells = CharTable.getElementsByTagName('td');
var ResultTable = document.getElementById('ResultTable');

var players = [];

window.addEventListener('keydown', EditChar);

// Update the sum of players
function UpdatePlayers() {
    let sum = 0;
    for (let i = 0; i < Amounts.length; i++) {
        sum += Amounts[i];
    }
    document.getElementById('player-counter').innerHTML = ' 玩家人數: ' + sum;
}

// Select the character
function SelectChar() {
    // Find the row first
    CurrentRow = this.parentNode.rowIndex - 1;
        
    var UnselectedRows = CharTable.getElementsByTagName('tr');
    for (var row = 0; row < UnselectedRows.length; row++) {
        UnselectedRows[row].classList.remove('selected');
        UnselectedRows[row].style.backgroundColor = "";
    }
    var SelectedRow = CharTable.getElementsByTagName('tr')[CurrentRow + 1];
    SelectedRow.style.backgroundColor = "gray";
    SelectedRow.className += 'selected';
}

// Edit the character
function EditChar(e) {
    let keyID = e.code;

    // Delete - Delete Character
    if ((keyID === 'Delete') && (CurrentRow >= 0)) {
        let DeleteChar = Characters[CurrentRow];
        let DeleteAmt = Amounts[CurrentRow];
        let text = '確定刪除 ' + DeleteAmt + ' 個「' + DeleteChar + '」？'
        if (confirm(text)) {
            CharTable.getElementsByTagName('tr')[CurrentRow + 1].remove();
            Characters.splice(CurrentRow, 1);
            Amounts.splice(CurrentRow, 1);
            CurrentRow = -1;
            UpdatePlayers();
        } else {

        }
    }

    // Escape - Cancel Selection
    if ((keyID === 'Escape') && (CurrentRow >= 0)) {
        let row = CharTable.getElementsByTagName('tr')[CurrentRow + 1]
        row.classList.remove('selected');
        row.style.backgroundColor = "";
        CurrentRow = -1;
    }
}


// Add Character
function AddCharacter(Name, Amount) {
    let index = Characters.indexOf(Name);
    if (index >= 0) {
        Amounts[index] += parseInt(Amount);
        document.getElementById("NumberOf" + Name).innerHTML = Amounts[index];
    } else {
        // Add the new Character list
        const NewChar = document.createElement('tr');
        let NameCol = document.createElement('td');
        NameCol.innerHTML = Name;
        let AmtCol = document.createElement('td');
        AmtCol.innerHTML = Amount;
        NameCol.id = "Character" + Name;
        AmtCol.id = "NumberOf" + Name;

        // Append and add
        NewChar.append(NameCol);
        NewChar.append(AmtCol);
        NewChar.id = "GameChar" + Name;
        let ListOfChar = document.getElementById("CharTable");
        ListOfChar.append(NewChar);

        Characters.push(Name);
        Amounts.push(parseInt(Amount));
        UpdatePlayers();
    }

    CharTableCells = CharTable.getElementsByTagName('td');

    // Set the function of the rows
    for (var i = 0; i < CharTableCells.length; i++) {
        let cell = CharTableCells[i];
        cell.addEventListener('click', SelectChar);
    }
}

// Load the file
function LoadPreset() {
    var LoadedFile = document.getElementById('file-upload').files[0];

    var reader = new FileReader();
    reader.onload = function(fileLoadedEvent) {
        var textFromFile = fileLoadedEvent.target.result;
        let Characters = textFromFile.split('\n');
        for (let i = 0; i < Characters.length; i++) {
            let Items = Characters[i].split(' ');
            let CharacterName = Items[0];
            let CharacterAmt = Items[1];

            AddCharacter(CharacterName, CharacterAmt);
        }
    }

    reader.readAsText(LoadedFile, "UTF+8");
    document.getElementById('file-upload').value = '';
}

// Prompt a new character
function ParseChar() {
    var CharName = document.getElementById('CharName').value;
    var CharQuantity = document.getElementById('CharQuan').value;

    // Garbage Detection
    if (CharName == '' || CharQuantity == '') {
        alert('錯誤：角色名稱或數量不能為空白！');
        return;
    }
    if (CharQuantity <= 0) {
        alert('錯誤：角色數量必須是正數！');
        return;
    }

    AddCharacter(CharName, CharQuantity);
    document.getElementById('CharName').value = '';
    document.getElementById('CharQuan').value = '';
}

// View the Format of the Preset
function ViewPresetFormat() {
    let text = "檔案格式示例如下 (角色與數量之間有一空格)：\n" + "預言家 1\n" + "女巫 1\n" + "守衛 1\n" + "獵人 1\n" + "狼人 2\n" + "狼王 1\n" + "村民 3\n";
    alert(text);
}

// Randomize Characters

// Part 1 - Delete the previous record
function DeleteResult() {
    let NumOfRows = ResultTable.getElementsByTagName('tr');
    if (NumOfRows.length == 1) return; // Only the header
    for (let i = NumOfRows.length - 1; i > 0; i--) {
        NumOfRows[i].remove();
    }
}

// Part 2 - The main code
function RandomizeChars() {
    let NumOfRows = CharTable.getElementsByTagName('tr');
    if (NumOfRows.length == 1) return; // Only the header
    // Remove the previous result first
    DeleteResult();

    // Obtain the list of players
    players = [];
    for (let i = 0; i < Characters.length; i++) {
        for(let j = 0; j < Amounts[i]; j++) {
            players.push(Characters[i]);
        }
    }

    let RandomizeFactor = document.getElementById('RandomLevel').value;
    for (let times = 0; times < RandomizeFactor; times++) {
        for (let i = 0; i < players.length; i++) {
            let j = Math.floor(Math.random() * (i + 1));
            [players[i], players[j]] = [players[j], players[i]];
        }
    }

    // Print out result
    for (let i = 0; i < players.length; i++) {
         // Add the new Character list
         const Player = document.createElement('tr');
         let PlayerIDCol = document.createElement('td');
         PlayerIDCol.innerHTML = i + 1;
         let CharCol = document.createElement('td');
         CharCol.innerHTML = players[i];
         PlayerIDCol.id = "PlayerID" + i;
         CharCol.id = "PlayerChar" + i;
 
         // Append and add
         Player.append(PlayerIDCol);
         Player.append(CharCol);
         Player.id = "Player" + i;
         let ListOfPlayer = document.getElementById("ResultTable");
         ListOfPlayer.append(Player);
    }
}
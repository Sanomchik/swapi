var xhr, dataJson, dataCounter;
function selectapi() {
  request(this.firstChild.nodeValue, 1);
}
function val() {
for (var i = 0; i < 6; i++) {
  document.getElementsByClassName('dropdown-menu')[0].getElementsByTagName('li')[i].getElementsByTagName('a')[0].addEventListener("click", selectapi, false);
}
}
val();
function request(url, counter) {
  xhr = new XMLHttpRequest();
  var ajaxurl = 'http://swapi.co/api/' + url + '/' + counter+ '/';

  xhr.open('GET', ajaxurl, false);
  xhr.send();

  if (xhr.status != 200) {
    console.log(xhr.status + ': ' + xhr.statusText); 
  } else {
    console.log(JSON.parse(xhr.responseText)); 
  }
  dataJson = JSON.parse(xhr.responseText)
}
request('planets', 2);
var Article = React.createClass({
  render: function () {
    var dataTemplate;
    var propData = this.props.data;
    var arr =[]
    //var name = this.props.data.name,
    //model = this.props.data.model;
    for (var keys in propData) {
     arr.push (
      <div key={keys}>
      <p>{keys}: {propData[keys]}</p>
      </div>
      )
   }
   console.log(arr); 
   return (
    <div className="post">
    {arr}
    </div>
    );
    console.log(arr)
  }
});


var App = React.createClass({
  render: function () {
    return (
    <div className = 'app'>
    <h3> SWAPI </h3>
    <Article data = {dataJson} />
    </div>
    )
    ;
  }
});

ReactDOM.render(
<App />,
document.getElementById('root')
)
;
// 1. Создаём новый объект XMLHttpRequest

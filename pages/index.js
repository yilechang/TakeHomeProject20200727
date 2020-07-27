import Head from 'next/head'
import React, { PureComponent, forwardRef } from 'react';
import axios from 'axios';
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };
class App extends PureComponent {
  state = {
    data: [],
  };

  _handleApi = (url = '') => {
    return axios.get(url).catch(function (error) {
      console.log(error)
    })
  }
  _handleData = async () => {
    let res = await axios.get('https://data.taipei/api/v1/dataset/1f1aaba5-616a-4a33-867d-878142cac5c4?scope=resourceAquire').catch( (error) => console.log(error))
    console.log('res1', res)
    if(res === undefined || res.status !== 200) {
      console.log('few')
      res = await axios.get('http://localhost:3000/api/backup').catch( (error) => console.log(error))
      this.setState({data:res.data})
      return
    }
    this.setState({data:res.data.result.results})
    return
  }
  componentDidMount(){
    this._handleData()
  }
  render() {
    const { data } = this.state
    return (
      <div className="App">
        <Head>
          <title>Take Home Project</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <MaterialTable
          columns={[
            { title: "時間" ,field: "dataTime" },
            { title: "座標" ,field: "geocode" },
            { title: "行政區" ,field: "locationName" },
            { title: "緯度" ,field: "lat" },
            { title: "經度" ,field: "lon" },
            { title: "氣溫" ,field: "value" },
            { title: "單位" ,field: "measures" },
          ]}
          data={data}
          title="Take Home Project"
          options={{
            filtering: true
          }}
          icons={tableIcons}
          localization={{body:{ emptyDataSourceMessage:<h1>loading</h1> } }}
        />
      </div>
    );
  }
}

export default App;

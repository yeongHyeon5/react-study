import React, { Component } from 'react'
import Item from './Item';

export default class Items extends Component {
  constructor(props){
    super(props);
    this.state = {
      list : [],
      input : {
        name : '',
        price : ''
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount(){
    fetch('/data.json')
      .then((res) => res.json())
      .then(data =>{
        this.setState({
          list: data.data
        })
      })
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.list.length !== prevState.list.length){
      const temp = this.state.list.length - prevState.list.length;

      if(temp > 0){
        alert('물건 리스트가 늘어났습니다.')
      } else {
        alert('물건이 삭제되었습니다.')
      }
    }
  }

  handleChange(e){
    const {value, name} = e.target;
    this.setState(state => ({
      ...state,
      input:{
        ...state.input,
        [name] : value
      }
    }))
  }

  handleSave(){
    this.setState(state => ({
      list : state.list.concat({name : state.input.name , price: state.input.price}),
      input : {
        name : '',
        price : ''
      }
    }))
  }

  removeItem(index){
    this.setState(state => ({
      ...state,
      list: state.list.filter((item, idx) => idx !== index)
    }))
  }

  render() {
    return (
      <div>
        <div>
          { 
            this.state.list.map((item, index) =>
            <Item key={item.name + index} item={item} index={index} removeItem={this.removeItem}/>
            )
          }
        </div>
        <div style={{padding: '1rem'}}>
          <input name="name" value={this.state.input.name} onChange={this.handleChange} placeholder='name'/>
          <input name="price" value={this.state.input.price} onChange={this.handleChange} type="number" placeholder='price'/>
          <button onClick={this.handleSave}>저장</button>
        </div>
      </div>
    )
  }
}

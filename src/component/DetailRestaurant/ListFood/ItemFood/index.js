import React from "react";
import "./styles.css";
import StrUtils from "../../../../utils/StrUtils";

const ItemFood = ({ Avatar, Name, OriginalPrice, _id, addToCart, data, onChangeOption }) => {
  var options = [];

  if (data.Options) {
    options = (data.Options).map(function (option, index) {
        var type = option.IsMandatory ? "radio" : "checkbox";   
        return (
                <form key={index.toString() + option.id.toString()} style={{marginLeft: "20px"}}>
                  <p style={{fontWeight: "bold"}}>{"* " + option.Name}</p>
                  {option.Items.slice(0).reverse().map((item, index1) => (
                      <p key={index1.toString() + option.id.toString() + item.id}> 
                        {item.IsDefault === false && type !== "radio" ?
                          <input style={{marginLeft: "30px"}} type={type} id={_id.toString() + index1.toString() + option.id.toString() + index.toString() + item.id.toString()} name={option.id} value={item.id} onChange={()=>{}} onClick={(e) => onChangeOption(e, _id, option.id, item.id, type)}/>
                          : <input style={{marginLeft: "30px"}} type={type} id={_id.toString() + index1.toString() + option.id.toString() + index.toString() + item.id.toString()} name={option.id} value={item.id} checked onChange={()=>{}} onClick={(e) => onChangeOption(e, _id, option.id, item.id, type)}/>
                        }
                          <label for={_id.toString() + index1.toString() + option.id.toString() + index.toString() + item.id.toString()}>{item.Name} <span style={{fontWeight: "bold"}}>{item.OriginalPrice > 0 ? " - " + StrUtils.formatMoneyString(item.OriginalPrice) + "d" : ""}</span></label><br/>
                      </p>
                  ))}
                </form>)
    });
  }

  return (
    <>
    <div className="detail-restaurant-item-food__container">
      <div className="detail-restaurant-item-food__food">
        <div className="detail-restaurant-item-food__thumbnail">
          <img src={Avatar} alt="" />
        </div>
        <div className="detail-restaurant-item-food__info">
          <div className="detail-restaurant-item-food__info-name">{Name}</div>
          <div className="detail-restaurant-item-food__info-price">{StrUtils.formatMoneyString(OriginalPrice)}</div>
        </div>
      </div>
      <button
        className="detail-restaurant-item-food__add-to-cart"
        onClick={() => addToCart(_id)}
      >
        +
      </button>
    </div>
       <div style={{display: "block"}}>
        {options}
        </div>
    </>
  );
};

export default ItemFood;

import React from "react";
import "./styles.css";
import Localize from "../../../config/Localization";
import Localization from "../../../config/Localization";

const Timeline = (props) => {
	const { step } = props;

    if (step < 0) step = 0;
    else if (step > items.length - 1) step = items.length - 1;

    for (var i = 0; i < items.length; i++) {
        if (i <= step) {
            items[i].active = true;
        }
        else {
            items[i].active = false;
        }
    }

	const totalItems = items.length;
	const numberOfActiveItems = items.filter(item => item.active).length;
	const progressBarWidth = totalItems > 1 ? (numberOfActiveItems - 1) / (totalItems - 1) * 100 : 0;
	
	return (
		<div className="timeline">
			<div className="timeline-progress" style={{ width: `${progressBarWidth}%`}}></div>
			<div className="timeline-items">
				{items.map((item, i) => (
					<div key={i} className={"timeline-item" + (item.active ? ' active' : '')}>
						<div className="timeline-content">
							{item.name}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

var items = [
	{
		name: Localization.text("txt_order_waiting"),
		active: true,
	},
	{
		name: Localization.text("txt_order_get"),
		active: true,
	},
	{
		name: Localization.text("txt_order_ship"),
		active: true,
	},
	{
		name: Localization.text("txt_order_delivered"),
		active: false,
	}
]

export default Timeline;

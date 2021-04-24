import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ListItems from "../ListItems";
import CardVoucher from "./CardVoucher";
import service from "./service";
import Localization from "../../../config/Localization";


const ListVoucher = () => {
  const [listVoucher, setListVoucher] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMoreVoucher = () => {
    setIsLoading(true);

    (async () => {
      try {
        const { success, message, data } = await service.getMoreVoucher(
          listVoucher.length
        );

        setIsLoading(false);
        if (success) {
          setListVoucher((prev) => prev.concat(data.listVoucher));
        } else {
          alert(message);
        }
      } catch (e) {
        alert("[handleLoadMoreVoucher] Không thể kết nối với server.");
        console.error(`[LIST_RESTAURANT_BEST_SELLER]: ${e.message}`);
      }
    })();
  };

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      try {
        const { success, message, data } = await service.getListVoucher();

        setIsLoading(false);
        if (success) {
          setListVoucher(data.listVoucher);
        } else {
          alert(message);
        }
      } catch (e) {
        alert("Không thể kết nối với server.");
        console.error(`[LIST_VOUCHER]: ${e.message}`);
      }
    })();
  }, []);

  return (
    <ListItems
      shoudDisplayLoading={isLoading}
      lable={Localization.text("txt_collections")}
      onClickShowAll={() => {
        alert("Show all");
      }}
      onClickShowMore={handleLoadMoreVoucher}
    >
      {listVoucher.map((voucher) => {
        return (
          <Grid item md={4} key={voucher.id}>
            <CardVoucher
              urlImg={voucher.urlImg}
              nameVoucher={voucher.nameVoucher}
              quantityApply={voucher.quantityApply}
            />
          </Grid>
        );
      })}
    </ListItems>
  );
};

export default ListVoucher;

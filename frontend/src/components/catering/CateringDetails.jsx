import { useParams } from "react-router-dom";
import { cateringList } from "../../utils/content";
import MenuItem from "./MenuItem";

export const CateringDetails = () => {
  const { id } = useParams();

  const catering = cateringList?.find((item) => item._id == id);
  return (
    <div>
      <div className="d-flex flex-column p-1 ">
        <p className="col card mb-1">{catering.name}</p>
        <p className="col  card mb-1">{catering.description}</p>
      </div>
      <div className="row gap-1 p-3">
        {catering?.menus?.map((item, index) => (
          <MenuItem item={item} catering={catering} index={index} key={index} />
        ))}
      </div>
    </div>
  );
};

export default CateringDetails;

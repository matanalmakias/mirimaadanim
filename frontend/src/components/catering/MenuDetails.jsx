import { useState } from "react";
import { useParams } from "react-router-dom";
import { cateringList } from "../../utils/content";

export const MenuDetails = () => {
  const [showEditSomething, setShowEditSomething] = useState(false);
  const { id, index } = useParams();
  const catering = cateringList?.find((item) => item._id == id);
  const menu = catering?.menus?.find((item, itemIndex) => index == itemIndex);

  return (
    <div className="">
      <div className="row gap-1">
        <p className="bg-info text-black  card mb-1">מנה ראשונה - לחץ להסרה</p>
        <div className="col m-2">
          <div className="row gap-1">
            <p className="w_70  card mb-1 ">פילה טונה -</p>
            <input
              type="number"
              className="w_30 form-control  "
              required
              placeholder="הכנס כמות"
            />
          </div>
          <div className="row gap-1">
            <p className="w_70  card mb-1 ">פילה אמנון -</p>
            <input
              type="number"
              className="w_30 form-control  "
              required
              placeholder="הכנס כמות"
            />
          </div>
          <p
            onClick={() => setShowEditSomething((s) => !s)}
            className="card mb-1 m-1"
          >
            לאפשרויות נוספות
          </p>
          {showEditSomething && (
            <div className="m-3">
              <p className="card mb-1">פילה דניס +</p>
              <p className="card mb-1">פילה סלומון +</p>
              <p className="card mb-1">פילה סלומון אפוי בתנור +</p>
              <p className="card mb-1">דג מטוגן/מרלוזה +</p>
            </div>
          )}
        </div>

        <p className="bg-info text-black  card mb-1">מנה שנייה - לחץ להסרה</p>
        <div className="col m-2">
          <p className="card mb-1">בשר צלי ברוטב פטריות</p>
          <p className="card mb-1">כרעיים עוף בתנור</p>
          <p className="card mb-1">שניצלים</p>
        </div>
        <p className="bg-info text-black  card mb-1">תוספות</p>
        <div className="col m-2">
          <p className="card mb-1">בשר צלי ברוטב פטריות</p>
          <p className="card mb-1">כרעיים עוף בתנור</p>
          <p className="card mb-1">שניצלים</p>
        </div>
        <p className="bg-info text-black  card mb-1">סלטים</p>
        <div className="col m-2">
          <p className="card mb-1">סלט פיצוחים</p>
          <p className="card mb-1">חציל בלאדי על האש</p>
          <p className="card mb-1">מטבוחה</p>
          <p className="card mb-1">קולסלאום</p>
          <p className="card mb-1">תירס מקסיקני</p>
          <p className="card mb-1">גמבה צבעים</p>
        </div>
        <p className="bg-info text-black  card mb-1">חד פעמי - צבעים</p>
        <div className="col m-2">
          <p className="card mb-1">צבעי צלחות</p>
          <p className="card mb-1">צבעי מפות</p>
          <p className="card mb-1">צבעי סכו"ם</p>
        </div>
        <p className="bg-info text-black  card mb-1">שתייה קלה</p>
        <div className="col m-2">
          <p className="card mb-1">קולה</p>
          <p className="card mb-1">ספרייט</p>
        </div>
        <p className="bg-info text-black  card mb-1">כללי</p>
        <div className="col m-2">
          <p className="card mb-1">לחמניות צמה</p>
        </div>
      </div>
    </div>
  );
};
export default MenuDetails;

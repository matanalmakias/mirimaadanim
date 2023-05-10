import { createContext } from "react";
import { ShabatFoodProvider } from "./shabat-food/ShabatFoodContext";
import { SaladProvider } from "./salads/SaladContext";
import { PackageProvider } from "./package/PackageContext";
import { ProductProvider } from "./product/ProductContext";
import { PostProvider } from "./post/PostContext";
import { InventoryProvider } from "./inventory/InventoryContext";
export const IndexContext = createContext({ allIndexs: [] });
export const IndexProvider = ({ children }) => {
  return (
    <ShabatFoodProvider>
      <SaladProvider>
        <PackageProvider>
          <ProductProvider>
            <PostProvider>
              <InventoryProvider>{children}</InventoryProvider>
            </PostProvider>
          </ProductProvider>
        </PackageProvider>
      </SaladProvider>
    </ShabatFoodProvider>
  );
};

export default IndexContext;

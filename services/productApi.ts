import axiosInstance from "@/configs/axiosInstance"

export const productApi = {
    getProducts: async () => {
        return await axiosInstance.get("/store/products")
    }
}
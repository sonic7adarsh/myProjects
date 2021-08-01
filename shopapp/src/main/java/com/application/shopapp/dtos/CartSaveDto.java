package com.application.shopapp.dtos;


import java.io.Serializable;

public class CartSaveDto implements Serializable {

    private Long productVariationId;
    private  Long quantity;

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Long getProductVariationId() {
        return productVariationId;
    }

    public void setProductVariationId(Long productVariationId) {
        this.productVariationId = productVariationId;
    }

    @Override
    public String toString() {
        return "CartSaveDto{" +
                "productVariationId=" + productVariationId +
                ", quantity=" + quantity +
                '}';
    }
}

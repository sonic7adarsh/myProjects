package com.application.shopapp.dtos;

import com.application.shopapp.entities.Address;
import com.application.shopapp.entities.User;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;

public class OrderDto implements Serializable {

    private Long id;
    private User user;
    private double amountPaid;
    private Date dateCreated;
    @NotNull
    private String paymentMethod;
    private Address address;

    //*********************************************************************************************


    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public double getAmountPaid() {
        return amountPaid;
    }

    public void setAmountPaid(double amountPaid) {
        this.amountPaid = amountPaid;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    @Override
    public String toString() {
        return "Orders{" +
                "id=" + id +
                ", user=" + user +
                ", amountPaid=" + amountPaid +
                ", dateCreated=" + dateCreated +
                ", paymentMethod='" + paymentMethod + '\'' +
                '}';
    }
}

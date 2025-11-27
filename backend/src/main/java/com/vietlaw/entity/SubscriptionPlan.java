package com.vietlaw.entity;

public enum SubscriptionPlan {
    FREE(30),
    PLUS(300),
    PRO(-1); // -1 means unlimited

    private final int messageLimit;

    SubscriptionPlan(int messageLimit) {
        this.messageLimit = messageLimit;
    }

    public int getMessageLimit() {
        return messageLimit;
    }

    public boolean isUnlimited() {
        return messageLimit == -1;
    }
}
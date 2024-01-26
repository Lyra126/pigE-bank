public class Goal {
    private String goalName;
    private double goalAmount;
    private double amountObtained;
    private boolean onLock;

    public Goal(String goalName, double goalAmount){
        this.goalName = goalName;
        this.goalAmount = goalAmount;
        this.amountObtained = 0.0;
        this.onLock = true;
    }

    public final String getGoalName()
        {return this.goalName;}
    public void setGoalName(String goalName)
        {this.goalName = goalName;}
    public final double getGoalAmount()
        {return this.goalAmount;}
    public void setGoalAmount(double goalAmount)
        {this.goalAmount = goalAmount;}
    public final double getAmountObtained()
        {return this.amountObtained;}
    public void unlock()
        {this.onLock = false;}
    public void lock()
    {this.onLock = true;}
    public void deposit(double amount){
        amountObtained += amount;
        System.out.println("$" + amount + " deposited in " + goalName);
    }
    public void withdraw(double amount){
       if(!onLock) {
           amountObtained -= amount;
           System.out.println("$" + amount + " withdrawn from " + goalName);
       } else
           System.out.println("Warning! You cannot withdrawn money unless you state an emergency");
    }
    public void getProgress(){
        System.out.println("Progress: " + (amountObtained / goalAmount) * 100.0 );
    }
}


import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { userProfile, mockLeaveBalances } from "@/data/mockData";
import { format } from "date-fns";

const Profile = () => {
  // Generate initials for avatar fallback
  const initials = userProfile.name.split(' ').map(n => n[0]).join('');
  
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">My Profile</h1>
        <p className="text-muted-foreground">View and manage your account information</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center space-y-3">
                <Avatar className="h-24 w-24">
                  {/* Removed imageUrl that doesn't exist in the User type */}
                  <AvatarFallback className="text-2xl">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold">{userProfile.name}</h2>
                <p className="text-muted-foreground">{userProfile.email}</p>
                <Button variant="outline" className="mt-4">Change Profile Picture</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Employee Information</CardTitle>
              <CardDescription>Your personal and employment details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Department</h3>
                  <p className="text-base">{userProfile.department}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Position</h3>
                  <p className="text-base">{userProfile.position}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Employee ID</h3>
                  <p className="text-base">{userProfile.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Role</h3>
                  <p className="text-base capitalize">{userProfile.role}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-4">Annual Leave Entitlement</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockLeaveBalances.map((balance) => (
                    <div key={balance.type} className="p-3 rounded-md bg-muted/50">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{balance.type}</span>
                        <span className="text-muted-foreground text-sm">
                          {balance.available}/{balance.total} days
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="flex justify-end space-x-4">
                <Button variant="outline">Reset Password</Button>
                <Button>Edit Profile</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;

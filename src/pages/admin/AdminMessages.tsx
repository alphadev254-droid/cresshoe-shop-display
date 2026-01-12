import { useEffect, useState } from "react";
import { contactService, ContactSubmission } from "@/services/contactService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Mail, MailOpen, Trash2, Clock, User } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

const AdminMessages = () => {
  const [messages, setMessages] = useState<ContactSubmission[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactSubmission | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = async () => {
    setIsLoading(true);
    const data = await contactService.getAll();
    setMessages(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSelectMessage = async (message: ContactSubmission) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      await contactService.markAsRead(message.id);
      setMessages((prev) =>
        prev.map((m) => (m.id === message.id ? { ...m, isRead: true } : m))
      );
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const success = await contactService.delete(deleteId);
    if (success) {
      toast.success("Message deleted");
      if (selectedMessage?.id === deleteId) {
        setSelectedMessage(null);
      }
      fetchMessages();
    } else {
      toast.error("Failed to delete message");
    }
    setDeleteId(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground mt-1">
          Contact form submissions from customers
        </p>
      </div>

      {messages.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Mail className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No messages yet</h3>
            <p className="text-muted-foreground">
              Contact form submissions will appear here
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {messages.map((message) => (
              <Card
                key={message.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedMessage?.id === message.id
                    ? "ring-2 ring-primary"
                    : ""
                } ${!message.isRead ? "border-primary/50" : ""}`}
                onClick={() => handleSelectMessage(message)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="mt-1">
                        {message.isRead ? (
                          <MailOpen className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <Mail className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium truncate">{message.name}</span>
                          {!message.isRead && (
                            <Badge variant="default" className="text-xs">New</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {message.subject}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(new Date(message.createdAt), "MMM d, yyyy h:mm a")}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteId(message.id);
                      }}
                      className="text-destructive hover:text-destructive shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="lg:sticky lg:top-6 h-fit">
            {selectedMessage ? (
              <>
                <CardHeader className="border-b">
                  <CardTitle>{selectedMessage.subject}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{selectedMessage.name}</span>
                    <span className="text-muted-foreground">
                      ({selectedMessage.email})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {format(new Date(selectedMessage.createdAt), "MMMM d, yyyy 'at' h:mm a")}
                  </div>
                  <div className="pt-4 border-t">
                    <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                  <div className="pt-4">
                    <Button variant="outline" asChild className="w-full">
                      <a href={`mailto:${selectedMessage.email}`}>
                        Reply via Email
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Mail className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Select a message to view</p>
              </CardContent>
            )}
          </Card>
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Message</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this message? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminMessages;

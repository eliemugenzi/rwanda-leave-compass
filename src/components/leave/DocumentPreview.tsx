
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileDown, Eye } from "lucide-react";

interface DocumentPreviewProps {
  documentUrl: string;
  documentName: string;
  isAdminOrHR: boolean;
}

export const DocumentPreview = ({ documentUrl, documentName, isAdminOrHR }: DocumentPreviewProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(documentName);
  const isPdf = /\.pdf$/i.test(documentName);
  
  return (
    <>
      <div className="flex items-center gap-2 mt-1">
        <a 
          href={documentUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          download={documentName}
          className="text-sm text-primary hover:underline flex items-center"
        >
          <FileDown className="h-4 w-4 mr-1" />
          {documentName}
        </a>
        
        {isAdminOrHR && (isImage || isPdf) && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-0 h-auto text-sm text-muted-foreground hover:text-primary"
            onClick={() => setIsPreviewOpen(true)}
          >
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
        )}
      </div>
      
      {isAdminOrHR && (
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-4xl h-[80vh]">
            <DialogHeader>
              <DialogTitle>Document Preview: {documentName}</DialogTitle>
            </DialogHeader>
            <div className="flex-1 overflow-hidden h-full">
              {isPdf && (
                <iframe
                  src={`${documentUrl}#view=FitH`}
                  title="PDF Preview"
                  className="w-full h-full border-0"
                />
              )}
              {isImage && (
                <div className="flex items-center justify-center h-full overflow-auto">
                  <img 
                    src={documentUrl} 
                    alt="Document Preview" 
                    className="max-w-full max-h-full object-contain" 
                  />
                </div>
              )}
              {!isImage && !isPdf && (
                <div className="flex items-center justify-center h-full">
                  <p>Preview not available for this file type. Please download it to view.</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

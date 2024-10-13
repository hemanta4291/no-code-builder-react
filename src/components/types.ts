export interface ContainerProps {
    container: ElementProps;
    onSelectElement: (element: ElementProps) => void;
    onAddElementToColumn: (
      containerId: string,
      columnId: string,
      element: ElementProps
    ) => void;
  }

export interface ElementProps {
    id: string;
    type: 'Text' | 'Image' | 'Container';
    content: string; 
    top: number; 
    left: number; 
    width?: number |string; 
    height?: number | string; 
    fontSize?: number;
    color?: string;
    lineHeight?: number;
    letterSpacing?: number;
    textAlign?: 'left' | 'center' | 'right'| 'justify';
    alt?: string;
    columns?: number;
    padding?: number;
    margin?: number;
    children?: ColumnProps[];
  }
  
  export interface ColumnProps {
    id: string;
    elements: ElementProps[];
  }
  
  export interface SidebarProps {
    selectedElement: ElementProps | null;
    setSelectedElement: React.Dispatch<React.SetStateAction<ElementProps | null>>;
    onElementChange: (updatedElement: ElementProps) => void;
    
  }



  export interface CanvasAreaProps {
    elements: ElementProps[];
    setElements: React.Dispatch<React.SetStateAction<ElementProps[]>>;
    setSelectedElement: (element: ElementProps | null) => void;
  }


  export interface TopBarProps {
    onPreview: () => void;
    onViewSource: () => void;
  }

  export interface SourceCodeModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    htmlContent: string; 
  }

  export interface PreviewModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    elements: ElementProps[];
  }
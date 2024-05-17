import React, { useRef, startTransition } from 'react';
import JoditEditor from 'jodit-react';
import { useMemo } from 'react';
import { useTransition } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContent } from '../features/blogContentSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function Editor() {
	const editor = useRef(null);
	// const [content, setContent] = useState('');
	const [isLoading, startTransition] = useTransition();
	let initialContent = useSelector((state) => state.blogContent);
	let content = initialContent.data;
	const dispatch = useDispatch();

	// const previewData = useSelector((state) => state.blogContent);

	// console.log(content);

	const config = useMemo(
		() => ({
			saveModeInStorage: true,
			askBeforePasteHTML: false,
			askBeforePasteFromWord: false,
			// defaultActionOnPaste: 'insert_only_text',
			// preset: 'inline',

			autofocus: true,
			uploader: {
				insertImageAsBase64URI: true,
			},
			toolbarSticky: true,
			
			toolbarButtonSize: 'large',
			minimumHeight: 1000,
			minHeight: 701,
			maxWidth: 800,
			buttons:
				'bold,italic,underline,strikethrough,ul,ol,font,fontsize,align,paragraph,brush,lineHeight,superscript,subscript,image,spellcheck,copy,hr,table,link,symbols,fullsize,source,undo,redo',
		}),
		[]
	);

	const handleChange = (newContent) => {
		startTransition(() => {
			dispatch(addContent(newContent));
		});
	};

	return (
		<div className=" ">
			<JoditEditor ref={editor} value={content} config={config} tabIndex={1} onChange={handleChange} />
		</div>
	);
}

export default Editor;

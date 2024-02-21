import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RetrievalQAChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";

export async function runPDFQASearch(pdfPath: string, question: string): Promise<string> {
  const loader = new PDFLoader(pdfPath);
  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 20,
  });

  const splittedDocs = await splitter.splitDocuments(docs);

  const embeddings = new OpenAIEmbeddings();

  const vectorStore = await MemoryVectorStore.fromDocuments(
    splittedDocs,
    embeddings
  );

  const vectorStoreRetriever = vectorStore.asRetriever();
  const model = new OpenAI({
    modelName: 'gpt-3.5-turbo'
  });

  const chain = RetrievalQAChain.fromLLM(model, vectorStoreRetriever);

  const answer = await chain.call({
    query: question
  });

  return answer?.text;
}





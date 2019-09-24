import com.lex.zhao.textKeyword.underCommunication.FileUploadFile;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;

import java.io.*;

/**
 * Created by qtfs on 2018/7/10.
 */
public class FileUploadServerHandler extends ChannelInboundHandlerAdapter {
    private int byteRead;
    private volatile int start = 0;
    private String file_dir_buildPath = "src\\main\\demos\\ShowTopology";
    private String file_dir_keyWords = "src\\main\\demos\\ShowTopology";
    private String file_dir_newPolicy = "src\\main\\demos\\newPolicy";
    private String file_dir_currentRules = "src\\main\\demos\\Policy_optimization";
    String path;
    File file;
    public static BufferedReader bufread;
    //指定文件路径和名称

    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        if (msg instanceof FileUploadFile) {
            FileUploadFile ef = (FileUploadFile) msg;
            byte[] bytes = ef.getBytes();
            byteRead = ef.getEndPos();
            System.out.println("endPos : " + byteRead);
            String md5 = ef.getFile_md5();
            if(md5.equals("buildPath.json"))
                path = file_dir_buildPath + File.separator + md5;
            if(md5.equals("keywords.json") || md5.equals("policy.json"))
                path = file_dir_keyWords + File.separator + md5;
            if(md5.equals("newPolicy.drl"))
                path = file_dir_newPolicy + File.separator + md5;
            if(md5.equals("current_rules.json"))
                path = file_dir_currentRules + File.separator + md5;
            file = new File(path);
            //文件清空
            FileWriter fileWriter =new FileWriter(file);
            fileWriter.write("");
            fileWriter.flush();
            fileWriter.close();

            RandomAccessFile randomAccessFile = new RandomAccessFile(file, "rw");
            randomAccessFile.seek(start);

            randomAccessFile.write(bytes);
           FileUploadServer.readTxtFile(file);
            randomAccessFile.close();
            start = start + byteRead;
            if (byteRead > 0) {
                ctx.writeAndFlush(start);
                randomAccessFile.close();
                ctx.close();
            } else {
                randomAccessFile.close();
                ctx.close();
            }
        }
    }


    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        cause.printStackTrace();
        ctx.close();
    }
}

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelOption;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.codec.serialization.ClassResolvers;
import io.netty.handler.codec.serialization.ObjectDecoder;
import io.netty.handler.codec.serialization.ObjectEncoder;

import java.io.*;
import java.util.concurrent.TimeUnit;
import java.util.Scanner;
/**
 * Created by qtfs on 2018/7/10.
 */
public class FileUploadServer {
    public static BufferedReader bufread;
    public void bind(int port) throws Exception {
        EventLoopGroup bossGroup = new NioEventLoopGroup();
        EventLoopGroup workerGroup = new NioEventLoopGroup();
        try {
            ServerBootstrap b = new ServerBootstrap();
            b.group(bossGroup, workerGroup).channel(NioServerSocketChannel.class).option(ChannelOption.SO_BACKLOG, 1024).childHandler(new ChannelInitializer<SocketChannel>() {

                @Override
                protected void initChannel(SocketChannel ch) throws Exception {
                    ch.pipeline().addLast(new ObjectEncoder());
                    ch.pipeline().addLast(new ObjectDecoder(Integer.MAX_VALUE, ClassResolvers.weakCachingConcurrentResolver(null))); // 最大长度
                    ch.pipeline().addLast(new FileUploadServerHandler());
                }
            });
            ChannelFuture f = b.bind(port).sync();
            f.channel().closeFuture().sync();
        } finally {
            bossGroup.shutdownGracefully();
            workerGroup.shutdownGracefully();
        }
    }

    public  static void readTxtFile(File filename) {
        String read;
        FileReader fileread;
        try {
            fileread = new FileReader(filename);
            bufread = new BufferedReader(fileread);
            while ((read = bufread.readLine()) != null) {
                System.out.println(read);
            }

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException ex) {
        }
    }


    public static void main(String[] args) {
        int port = 4048;
        try {
            TimeUnit.SECONDS.sleep(10);
            new Thread() {
                @Override
                public void run() {
                    String content = "";
                    try {
                        while (true) {
                            File file = new File("src\\main\\resources\\intend.txt");

                            //src\\\\main\\\\demos\\\\Management\\\\generate.drl
                            // utf-8


                            BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(file),"unicode"));
                            String contentNew = reader.readLine();
                            reader.close();
                            if (!contentNew.equals(content)) {
                                IntendSend.connect();
                                System.out.println(contentNew);
                                content = contentNew;
                            }
                            TimeUnit.MILLISECONDS.sleep(2000);
                        }
                    } catch (Exception ex) {
                    }
                }
            }.start();
            new FileUploadServer().bind(port);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
package com.cisbaf.API_CanalDenuncias.Form.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    
    @Value("${email.destinatario}")
    private String emailDestinatario;

    @Value("${spring.mail.username}")
    private String emailRemetente;

    //Monta e envia o email
    public void enviarEmail(String formularioHtml) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

            helper.setTo(emailDestinatario);
            helper.setSubject("Nova Denúncia Recebida - Canal de Denúncias");
            helper.setText(formularioHtml, true);

            helper.setReplyTo("nao-responda-limbo@cisbaf.org.br");

            try {
                helper.setFrom(emailRemetente, "Cisbaf - Canal de Combate ao Assédio e Discriminação");
            } catch (java.io.UnsupportedEncodingException e) {
                log.error("Erro ao definir o nome do remetente: {}", e.getMessage());
                helper.setFrom(emailRemetente);
            }

            mimeMessage.setHeader("X-Mailer", "JavaMailSender");
            mimeMessage.setHeader("X-Priority", "3");

            mimeMessage.setHeader("Message-ID", "<" + System.currentTimeMillis() + "@cisbaf.org.br>");

            mailSender.send(mimeMessage);

        } catch (Exception e) {
            log.error("Erro ao enviar email: {}", e.getMessage());
        }
    }

    //Inicia o envio do email
    @Async
    public void enviarEmailNovaDenuncia(String protocolo) {
        enviarEmail(
            montarEmailDeNovaDenuncia(protocolo)
        );
    }

    //Retorna um texto HTML que pode ser inserido em qualquer lugar 
    private String montarEmailDeNovaDenuncia(String protocolo) {
        LocalDate dataRegistro = LocalDate.now();
        String dataFormatada = dataRegistro != null ? dataRegistro.format(DateTimeFormatter.ofPattern("dd/MM/yyyy")) : "Não informada";
        
        return "<!DOCTYPE html>\n" +
               "<html lang=\"pt-BR\">\n" +
               "<head>\n" +
               "    <meta charset=\"UTF-8\">\n" +
               "    <style>\n" +
               "        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9fb; margin: 0; padding: 0; }\n" +
               "        .container { max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden; border: 1px solid #e1e4e8; }\n" +
               "        .header { background-color: #1a365d; color: #ffffff; padding: 25px 20px; text-align: center; }\n" +
               "        .header h2 { margin: 0; font-size: 24px; font-weight: 600; }\n" +
               "        .content { padding: 30px; color: #334155; line-height: 1.6; }\n" +
               "        .content p { margin: 0 0 15px 0; font-size: 16px; }\n" +
               "        .info-card { background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #3b82f6; border-radius: 4px; padding: 20px; margin: 25px 0; }\n" +
               "        .info-item { margin-bottom: 10px; font-size: 16px; }\n" +
               "        .info-item:last-child { margin-bottom: 0; }\n" +
               "        .info-label { font-weight: 600; color: #475569; }\n" +
               "        .info-value { color: #0f172a; font-weight: 700; }\n" +
               "        .footer { background-color: #f1f5f9; color: #64748b; padding: 20px; text-align: center; font-size: 13px; border-top: 1px solid #e2e8f0; }\n" +
               "    </style>\n" +
               "</head>\n" +
               "<body>\n" +
               "    <div class=\"container\">\n" +
               "        <div class=\"header\">\n" +
               "            <h2>Canal de Denúncias</h2>\n" +
               "        </div>\n" +
               "        <div class=\"content\">\n" +
               "            <p>Olá,</p>\n" +
               "            <p>Uma nova denúncia foi registrada com sucesso em nosso sistema.</p>\n" +
               "            <div class=\"info-card\">\n" +
               "                <div class=\"info-item\">\n" +
               "                    <span class=\"info-label\">Número do Protocolo:</span>\n" +
               "                    <span class=\"info-value\">" + protocolo + "</span>\n" +
               "                </div>\n" +
               "                <div class=\"info-item\">\n" +
               "                    <span class=\"info-label\">Data de Registro:</span>\n" +
               "                    <span class=\"info-value\">" + dataFormatada + "</span>\n" +
               "                </div>\n" +
               "                <div class=\"info-item\">\n" +
               "                    <span class=\"info-label\">URL para Acompanhamento:</span>\n" +
               "                    <span class=\"info-value\">" + "<a href=\"http://localhost:3000/admin\">Acessar o sistema administrativo</a>" + "</span>\n" +
               "                </div>\n" +
               "            </div>\n" +
               "            <p>Acesse o sistema administrativo para visualizar os detalhes desta denúncia.</p>\n" +
               "        </div>\n" +
               "        <div class=\"footer\">\n" +
               "            <p>Este é um e-mail automático. Por favor, não responda a esta mensagem.</p>\n" +
               "            <p>&copy; " + LocalDate.now().getYear() + " Cisbaf. Todos os direitos reservados.</p>\n" +
               "        </div>\n" +
               "    </div>\n" +
               "</body>\n" +
               "</html>";
    }

}

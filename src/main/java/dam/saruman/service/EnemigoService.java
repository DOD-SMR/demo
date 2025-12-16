package dam.saruman.service;

import dam.saruman.controller.EnemigoController;
import dam.saruman.model.Enemigo;
import dam.saruman.repository.EnemigoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.Comparator;
import java.util.List;

@Service
public class EnemigoService {
    @Autowired
    private EnemigoRepository enemigoRepo;

    public List<Enemigo> obtenerTodos(){

        List<Enemigo> enemigos = enemigoRepo.findAll();

        if (enemigos.isEmpty()){
            System.out.println("ACHO QUE ESTO ESTA VACÍO");

        }else{
            System.out.println("Jefe eto funsiona y nse ni como");
            enemigos.forEach((enemigo) -> {
                System.out.println("ID: "+enemigo.getId()+" Nombre: "+enemigo.getNombre()+" pais: "+enemigo.getPais()+" afiliacion "+enemigo.getAfiliacion_politica());
            });
        }
        return enemigos;

    }//fin get
    public Enemigo obtenerEnemigoNombre(String nombre){

        Enemigo e1 = enemigoRepo.findByNombre(nombre);

        if (e1 ==null){
            throw new NotFoundException("Error, nombre no encontrado");
        }

        return e1;
    }
    public List<Enemigo> obtenerTodosOrdenados(){
        List<Enemigo> enemigos = enemigoRepo.findAll();

        if (enemigos.isEmpty()){
            System.out.println("ACHO QUE ESTO ESTA VACÍO");

        }else{
            System.out.println("Jefe eto funsiona y nse ni como");
            enemigos.forEach((enemigo) -> {
                System.out.println("ID: "+enemigo.getId()+" Nombre: "+enemigo.getNombre()+" pais: "+enemigo.getPais()+" afiliacion "+enemigo.getAfiliacion_politica());
            });
        }
        return enemigos.stream()
                .sorted(Comparator.comparing(Enemigo::getNombre))
                .toList();
    }
    public Enemigo obtenerEnemigo(String id){
        return enemigoRepo.findById(id).get();
    }
    public Enemigo editarEnemigo(String id, Enemigo enemigo){
        if (enemigo.getNombre().length()<3){
            throw new BadRequestException("Error al editar, el nombre tiene menos de 3 caracteres");
        }
        if (obtenerTodos().stream().anyMatch(enemigoLista -> enemigoLista.getNombre().equals(enemigo.getNombre()))){
            throw new BadRequestException("Error al editar, el nombre está repetido");
        }
        Enemigo devuelto = this.obtenerEnemigo(id);
        devuelto.setNombre(enemigo.getNombre());
        devuelto.setPais(enemigo.getPais());
        devuelto.setAfiliacion_politica(enemigo.getAfiliacion_politica());
        return enemigoRepo.save(devuelto);
    }
    public Enemigo guardar(Enemigo enemigo){
        if (obtenerTodos().stream().anyMatch(enemigoLista -> enemigoLista.getNombre().equals(enemigo.getNombre()))){
            throw new BadRequestException("Error al insertar, el nombre está repetido");
        }else{
            if (enemigo.getNombre().length()<3){
                throw new BadRequestException("Error al insertar, el nombre tiene menos de 3 caracteres");

            }
            return enemigoRepo.save(enemigo);
        }

    }// fin post
    public void eliminarEnemigo(String id){
        enemigoRepo.deleteById(id);
    }
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public class BadRequestException extends RuntimeException {
        public BadRequestException(String mensaje) {
            super(mensaje);
        }
    }
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public class NotFoundException extends RuntimeException {
        public NotFoundException(String mensaje) {
            super(mensaje);
        }
    }

}

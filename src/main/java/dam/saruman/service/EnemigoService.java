package dam.saruman.service;

import dam.saruman.model.Enemigo;
import dam.saruman.repository.EnemigoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public Enemigo obtenerEnemigo(Long id){
        return this.obtenerTodos().stream().filter(enemigo -> enemigo.getId() == id).findFirst().get();
    }
    public Enemigo editarEnemigo(Long id, Enemigo enemigo){
        this.obtenerEnemigo(id).setNombre(enemigo.getNombre());
        this.obtenerEnemigo(id).setPais(enemigo.getPais());
        this.obtenerEnemigo(id).setAfiliacion_politica(enemigo.getAfiliacion_politica());
        return enemigoRepo.save(this.obtenerEnemigo(id));
    }
    public Enemigo guardar(Enemigo enemigo){
        return enemigoRepo.save(enemigo);
    }// fin post



}
